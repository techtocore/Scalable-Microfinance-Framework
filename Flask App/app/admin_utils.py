from flask_jwt import jwt_required
import json
from flask_api import status
from collections import OrderedDict
from flask_jwt import JWT, jwt_required, current_identity
from flask import jsonify
from flask import Flask, request


def admin_utils(app, mongo):
    @app.route('/users')
    @jwt_required()
    def users():
        me = '%s' % current_identity
        meJson = json.loads(me)
        if(meJson.get('role') != 'su'):
            error = {"error": "Hey, you shouldn't be here"}
            return json.dumps(error), status.HTTP_403_FORBIDDEN
        record = mongo.db.users
        uList = []
        for x in record.find():
            json1 = OrderedDict()
            json1['name'] = x['name']
            json1['email'] = x['email']
            json1['role'] = x['role']
            json1['company'] = x['company']
            json1['location'] = x['location']
            uList.append(json1)
        res = {}
        res['users'] = uList
        return json.dumps(res, ensure_ascii=False)

    @app.route('/attachRole', methods=['POST'])
    @jwt_required()
    def attachRole():
        req_data = request.get_json()
        role = req_data.get('role')
        me = '%s' % current_identity
        meJson = json.loads(me)
        if(meJson.get('role') != 'su'):
            error = {"error": "Hey, you shouldn't be here"}
            return json.dumps(error), status.HTTP_403_FORBIDDEN
        record = mongo.db.users
        query = {}
        query['email'] = req_data.get('email')
        json1 = {}
        if role is not None:
            json1['role'] = role
        json2 = {}
        json2['$set'] = json1
        record.update_one(query, json2)
        dictionary = OrderedDict()
        dictionary['message'] = 'success'
        content = json.dumps(dictionary)
        return content, status.HTTP_200_OK
