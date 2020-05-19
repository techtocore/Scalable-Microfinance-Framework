from flask import Flask, url_for, redirect, request, render_template
from flask_jwt import JWT, jwt_required, current_identity
import json
from flask_api import status
from requests import get
from datetime import datetime
from collections import OrderedDict


def merchant_module(app, mongo):

    @app.route('/merchantRegister', methods=['POST'])
    @jwt_required()
    def addBank():
        try:
            me = '%s' % current_identity
            me = json.loads(me)
            phone = me['phone']
            req_data = request.get_json()
            bank = req_data.get('bank')

            record1 = mongo.db.remittance
            f = 1
            for x in record1.find():
                if x['phone'] == phone:
                        f = 0
                        break

            if f == 0:
                dictionary = OrderedDict()
                dictionary['message'] = 'error'
                content = json.dumps(dictionary)
                return content, status.HTTP_412_PRECONDITION_FAILED

            rec = {
                'phone': phone,
                'bank': bank,
                'amount': 0
            }
            record1.insert_one(rec)
            
            res = {
                'message': 'Bank Added'
            }
            return json.dumps(res, indent=4, sort_keys=True, default=str)
        except:
            error = {"error": "Please try again"}
            return json.dumps(error), status.HTTP_500_INTERNAL_SERVER_ERROR
