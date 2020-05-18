from app.modules.workflow.sender import sender_module

def import_modules(app, mongo):

    # workflow
    sender_module(app, mongo)
