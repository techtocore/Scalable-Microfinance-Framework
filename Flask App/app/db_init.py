from flask_pymongo import PyMongo
import os


def connect(app):
    url = os.getenv('MONGODB_URL', 'mongodb://localhost:27017')
    dbName = os.getenv('MONGODB_NAME', 'SMF')
    app.config["MONGO_URI"] = url + '/' + dbName
    mongo = PyMongo(app)
    return mongo
