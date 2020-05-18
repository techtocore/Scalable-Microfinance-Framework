from flask import Flask, url_for, redirect, request, render_template
from flask_jwt import JWT, jwt_required, current_identity
import json
from flask_api import status
from requests import get
from datetime import datetime
from collections import OrderedDict


def dash_module(app, mongo):
    @app.route('/test', methods=['GET'])
    def test():
        res = {
            'message': 'test'
        }
        return json.dumps(res, indent=4, sort_keys=True, default=str)

    @app.route('/linkReceiver', methods=['POST'])
    @jwt_required()
    def link():
        try:
            me = '%s' % current_identity
            me = json.loads(me)
            phone1 = me['phone']
            req_data = request.get_json()
            phone2 = req_data.get('receiverPhone')
            json1 = {
                'phone1': phone1,
                'phone2': phone2,
                'amount': 0
            }
            record = mongo.db.accounts
            f = 1
            for x in record.find():
                if x['phone1'] == phone1 and x['phone2'] == phone2:
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
