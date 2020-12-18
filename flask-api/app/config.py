from app import flask_app
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
# load_dotenv(path.join(basedir, '.env'))

db = SQLAlchemy(flask_app)
ma = Marshmallow(flask_app)
flask_app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024


flask_app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:1234@localhost:3306/flask_app'
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
flask_app.config['SQLALCHEMY_ECHO'] = False
