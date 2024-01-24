from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource, reqparse
from models import db, RestaurantPizza, Restaurant, Pizza

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pizza_restaurants.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)
db.init_app(app)
api = Api(app)

post_parser = reqparse.RequestParser()
post_parser.add_argument('price', type=float, required=True, help='Price must be a valid float.')
post_parser.add_argument('pizza_id', type=int, required=True, help='Pizza ID must be a valid integer.')
post_parser.add_argument('restaurant_id', type=int, required=True, help='Restaurant ID must be a valid integer.')

class RestaurantListResource(Resource):
    def get(self):
        restaurants = Restaurant.query.all()
        return jsonify([restaurant.to_dict() for restaurant in restaurants])

api.add_resource(RestaurantListResource, '/restaurants')

class RestaurantResource(Resource):

    def get(self, id):
        restaurant = Restaurant.query.get(id)
        if restaurant:
            return jsonify(restaurant.to_dict_with_pizzas())
        else:
            abort(404, description="Restaurant not found")

    def delete(self, id):
        restaurant = Restaurant.query.get(id)
        if restaurant:
            db.session.delete(restaurant)
            db.session.commit()
            return jsonify({})
        else:
            abort(404, error="Restaurant not found")

api.add_resource(RestaurantResource, '/restaurants/<int:id>')

class PizzaListResource(Resource):
    def get(self):
        pizzas = Pizza.query.all()
        return jsonify([pizza.to_dict() for pizza in pizzas])

api.add_resource(PizzaListResource, '/pizzas')

class RestaurantPizzaResource(Resource):
    def post(self):
        try:
            data = request.get_json()
            price = data.get('price')
            if price is None:
                return {'error': 'Price is required'}, 400
            
            restaurant_pizza = RestaurantPizza()
            # Continue with the rest of your logic for handling the post request
            return {'message': 'RestaurantPizza added successfully'}, 201

        except Exception as e:
            return {'error': str(e)}, 500

api.add_resource(RestaurantPizzaResource, '/restaurant_pizzas')

if __name__ == '__main__':
    app.run(port=5000)
