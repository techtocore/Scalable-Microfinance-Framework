# Flask Scaffold

## Prerequisites

- Python 3
- MongoDB
- RabbitMQ

### Setting up RabbitMQ

```
rabbitmqctl add_user <APP_NAME> <USER_NAME>
rabbitmqctl add_vhost <VHOST>
rabbitmqctl set_user_tags <APP_NAME> <APP_NAME>
rabbitmqctl set_permissions -p <VHOST> <APP_NAME> ".*" ".*" ".*"
```

## Running the server

```
pip install -r requirements.txt
python app.py
celery -A app.celery worker -l info -P gevent
```

Run the app and the celery worker in two separate terminal windows.