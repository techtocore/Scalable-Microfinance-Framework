from flask import Flask, request
from flask_api import status
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
import json
from collections import OrderedDict
from passlib.hash import pbkdf2_sha256 as sha256
import datetime


def generate_hash(password):
    return sha256.hash(password)


def verify_hash(hash, password):
    return sha256.verify(password, hash)


def auth(app, mongo):
    class User(object):
        def __init__(self, id, role, password, name, location):
            self.id = id
            self.role = role
            self.password = password
            self.name = name
            self.location = location

        def __str__(self):
            dictionary = OrderedDict()
            dictionary['phone'] = self.id
            dictionary['role'] = self.role
            dictionary['name'] = self.name
            dictionary['location'] = self.location

            content = json.dumps(dictionary)
            return content

    def authenticate(username, password):
        users = []
        record = mongo.db.users
        for x in record.find():
            users.append(User(x['phone'], x['role'], x['password'],
                              x['name'], x['location']))
        username_table = {u.id: u for u in users}
        user = username_table.get(username, None)
        if user and verify_hash(user.password.encode('utf-8'), password.encode('utf-8')):
            return user

    def identity(payload):
        users = []
        record = mongo.db.users
        for x in record.find():
            users.append(User(x['phone'], x['role'],
                              x['password'], x['name'], x['location']))
        userid_table = {u.id: u for u in users}
        user_id = payload['identity']
        res = userid_table.get(user_id, None)
        return res

    app.config['SECRET_KEY'] = 'super-secret'
    app.config['JWT_EXPIRATION_DELTA'] = datetime.timedelta(seconds=3600)

    jwt = JWT(app, authenticate, identity)

    @app.route('/test', methods=['GET'])
    def test():
        res = {
            'message': 'test'
        }
        return json.dumps(res, indent=4, sort_keys=True, default=str)
    
    @app.route('/me')
    @jwt_required()
    def me():
        return '%s' % current_identity

    @app.route('/addUser', methods=['POST'])
    def addUser():
        req_data = request.get_json()
        name = req_data['name']
        phone = req_data['phone']
        password = req_data['password']
        location = req_data['location']
        role = req_data['role']
        f = 1
        if role not in ['admin', 'sender', 'receiver', 'merchant'] or len(password) < 8:
            f = 0
        record = mongo.db.users
        for x in record.find():
            if x['phone'] == phone:
                f = 0
        if f == 0:
            dictionary = OrderedDict()
            dictionary['message'] = 'error'
            content = json.dumps(dictionary)
            return content, status.HTTP_412_PRECONDITION_FAILED
        else:
            json1 = {}
            json1['name'] = name
            # phone is taken as the primary key for auth workflow
            json1['phone'] = phone
            json1['password'] = generate_hash(password)
            json1['role'] = role
            json1['location'] = location
            record.insert_one(json1)
            dictionary = OrderedDict()
            dictionary['message'] = 'success'
            content = json.dumps(dictionary)
            return content, status.HTTP_201_CREATED

    @app.route('/changeUser', methods=['POST'])
    @jwt_required()
    def changeUser():
        req_data = request.get_json()
        name = req_data.get('name')
        oldPassword = req_data.get('oldPassword')
        password = req_data.get('password')
        location = req_data.get('location')
        user = '%s' % current_identity
        userJson = json.loads(user)
        query = {}
        query['phone'] = userJson.get('phone')
        record = mongo.db.users
        for x in record.find():
            if x['phone'] == query['phone']:
                if not(verify_hash(x['password'].encode('utf-8'), oldPassword.encode('utf-8'))):
                    error = {"error": "The old password is incorrect"}
                    return json.dumps(error), status.HTTP_403_FORBIDDEN
        json1 = {}
        if name is not None:
            json1['name'] = name
        if password != oldPassword and len(password) >= 8:
            json1['password'] = generate_hash(password)
        if location is not None:
            json1['location'] = location
        json2 = {}
        json2['$set'] = json1
        record.update_one(query, json2)
        dictionary = OrderedDict()
        dictionary['message'] = 'success'
        content = json.dumps(dictionary)
        return content, status.HTTP_200_OK
