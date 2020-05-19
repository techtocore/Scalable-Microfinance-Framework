from flask import Flask, url_for, redirect, request, render_template
from flask_jwt import JWT, jwt_required, current_identity
import json
from flask_api import status
from requests import get
from datetime import datetime
from collections import OrderedDict


def receiver_module(app, mongo):

    @app.route('/transact', methods=['POST'])
    @jwt_required()
    def transfer():
        try:
            me = '%s' % current_identity
            me = json.loads(me)
            phone1 = me['phone']
            req_data = request.get_json()
            phone3 = req_data.get('merchantPhone')
            amount = req_data.get('amount')

            record1 = mongo.db.accounts
            f = 0
            for x in record1.find():
                if x['phone1'] == phone1:
                    phone2 =  x['phone2']
                    avail = x['amount']
                    if x['amount'] < amount:
                        f = 0
                        break
                    f = 1
                    break

            if f == 0:
                dictionary = OrderedDict()
                dictionary['message'] = 'error'
                content = json.dumps(dictionary)
                return content, status.HTTP_412_PRECONDITION_FAILED

            q1 = {
                'phone1': phone1,
                'phone2': phone2
            }
            json1 = {}
            json1['amount'] = avail - amount
            json2 = {}
            json2['$set'] = json1
            record1.update_one(q1, json2)
            
            record2 = mongo.db.remittance
            m_amt = 0
            for x in record2.find():
                if x['phone'] == phone3:
                    m_amt = x['amount']
            m_amt += amount
            q1 = {
                'phone': phone3
            }
            json1 = {}
            json1['amount'] = m_amt
            json2 = {}
            json2['$set'] = json1
            record2.update_one(q1, json2)

            res = {
                'message': 'Amount Transferred'
            }
            return json.dumps(res, indent=4, sort_keys=True, default=str)
        except:
            error = {"error": "Please try again"}
            return json.dumps(error), status.HTTP_500_INTERNAL_SERVER_ERROR
