from flask import Flask
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Seans-Python-Flask-REST-Boilerplate"
    }
)
flask_app = Flask(__name__)
CORS(flask_app)
flask_app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)
