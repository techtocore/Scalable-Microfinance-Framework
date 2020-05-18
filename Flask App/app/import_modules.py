from app.modules.workflow.dashboard_info import dash_module

def import_modules(app, mongo):

    # workflow
    dash_module(app, mongo)
