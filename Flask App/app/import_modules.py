from app.modules.sender import sender_module
from app.modules.receiver import receiver_module

def import_modules(app, mongo):
    # workflow
    sender_module(app, mongo)
    receiver_module(app, mongo)
