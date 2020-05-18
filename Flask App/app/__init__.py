from flask import Flask
import os
import sys
from flask_cors import CORS
from app.db_init import connect
from app.auth import auth
from app.admin_utils import admin_utils
from app.import_modules import import_modules

if sys.version_info < (3, 0):
    print("\nSorry mate, you'll need to use Python 3+ on this one...\n")
    sys.exit(1)

flaskapp = Flask(__name__)

# Response type set to json by default
flaskapp.response_class.default_mimetype = 'application/json; charset=utf-8'

# Folder where uploaded files will be stored
# TODO make this a ENV variable
flaskapp.config['UPLOAD_FOLDER'] = 'C:\\tmp'

# MongoDB Connector
mongo = connect(flaskapp)

# Auth Controller
auth(flaskapp, mongo)

# User management routes
admin_utils(flaskapp, mongo)

# Import all 
import_modules(flaskapp, mongo)

# Enable CORS
CORS(flaskapp)

def create_app():
    environment = os.getenv('FLASK_ENV', 'dev').lower()
    if environment == 'dev':
        # run flaskapp in debug mode on port 5000
        port_no = 5000
        flaskapp.debug = True
    print("Starting in " + environment + "env")

    # listen on all public IPs
    flaskapp.run(host='0.0.0.0', port=port_no)
