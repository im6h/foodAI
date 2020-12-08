from app import flask_app
from flask import jsonify, request, url_for, redirect, abort
from app.models import Product
from app.schemas import product_schema, products_schema
from app.handle import handle


@flask_app.route('/', methods=['GET'])
def index():
    return 'Hello World'


@flask_app.route('/handler/', methods=['POST'])
def about():
    if request.method == 'POST':
        req = request.get_json()
    response = handle(req["url"])
    return response
