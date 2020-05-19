from flask import Flask, url_for, redirect, request, render_template
from flask_jwt import JWT, jwt_required, current_identity
import json
from flask_api import status
from requests import get
from datetime import datetime
from collections import OrderedDict


def sender_module(app, mongo):

    @app.route('/linkReceiver', methods=['POST'])
    @jwt_required()
    def link():
        try:
            me = '%s' % current_identity
            me = json.loads(me)
            phone_s = me['phone']
            req_data = request.get_json()
            phone_r = req_data.get('receiverPhone')
            json1 = {
                'phone_s': phone_s,
                'phone_r': phone_r,
                'amount': 0
            }
            record = mongo.db.accounts
            f = 1
            for x in record.find():
                if x['phone_s'] == phone_s and x['phone_r'] == phone_r:
                    f = 0
            if f == 0:
                dictionary = OrderedDict()
                dictionary['message'] = 'error'
                content = json.dumps(dictionary)
                return content, status.HTTP_412_PRECONDITION_FAILED

            record.insert_one(json1)
            res = {
                'message': 'Account Created'
            }
            return json.dumps(res, indent=4, sort_keys=True, default=str)
        except:
            error = {"error": "Please try again"}
            return json.dumps(error), status.HTTP_500_INTERNAL_SERVER_ERROR

    @app.route('/addMoney', methods=['POST'])
    @jwt_required()
    def add():
        try:
            me = '%s' % current_identity
            me = json.loads(me)
            phone_s = me['phone']
            req_data = request.get_json()
            phone_r = req_data.get('receiverPhone')
            amount = req_data.get('amount')
            json1 = {
                'phone_s': phone_s,
                'phone_r': phone_r,
                'amount': amount
            }
            record = mongo.db.accounts
            f = 1
            for x in record.find():
                if x['phone_s'] == phone_s and x['phone_r'] == phone_r:
                    f = 0
                    bal = x['amount']
            if f == 1:
                dictionary = OrderedDict()
                dictionary['message'] = 'error'
                content = json.dumps(dictionary)
                return content, status.HTTP_412_PRECONDITION_FAILED

            json1['amount'] += bal
            json2 = {}
            json2['$set'] = json1
            query = {
                'phone_s': phone_s,
                'phone_r': phone_r
            }
            record.update_one(query, json2)
            res = {
                'message': 'Added Amount'
            }
            return json.dumps(res, indent=4, sort_keys=True, default=str)
        except:
            error = {"error": "Please try again"}
            return json.dumps(error), status.HTTP_500_INTERNAL_SERVER_ERROR

    @app.route('/amountSent', methods=['GET'])
    @jwt_required()
    def amountSent():
        try:
            me = '%s' % current_identity
            me = json.loads(me)
            phone = me['phone']
            rec = mongo.db.transactions
            amt = 0
            for x in rec.find():
                if x['phone_s'] == phone:
                    amt += x['amount']
            res = {
                'amount': amt
            }
            return json.dumps(res, indent=4, sort_keys=True, default=str)
        except:
            error = {"error": "Please try again"}
            return json.dumps(error), status.HTTP_500_INTERNAL_SERVER_ERROR