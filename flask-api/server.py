from app import flask_app
from app import routes
from app import config
from app import models
from app import schemas


if __name__ == '__main__':
    flask_app.run(port=3000, debug=True, host="0.0.0.0")
