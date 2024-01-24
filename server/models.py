from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

# Create an instance of the SQLAlchemy class
db = SQLAlchemy()

# Pizza class representing the 'pizzas' table
class Pizza(db.Model, SerializerMixin):
    __tablename__ = 'pizzas'

    # Columns in the 'pizzas' table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    toppings = db.Column(db.String, nullable=False)

    # Relationship with the 'RestaurantPizza' table
    restaurant_pizzas = db.relationship('RestaurantPizza', backref='pizza', cascade='all, delete-orphan')

    # Validation for the 'toppings' column
    @validates('toppings')
    def validate_toppings(self, key, value):
        if not value:
            raise ValueError("Toppings must be present")
        return value

    # Repr method for better representation
    def __repr__(self):
        return f"Pizza(id={self.id}, name='{self.name}', toppings='{self.toppings}')"

    # Add the missing to_dict method
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'toppings': self.toppings
        }

# Restaurant class representing the 'restaurants' table
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    # Columns in the 'restaurants' table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)

    # Relationship with the 'RestaurantPizza' table
    restaurant_pizzas = db.relationship('RestaurantPizza', backref='restaurant', cascade='all, delete-orphan')

    # Repr method for better representation
    def __repr__(self):
        return f"Restaurant(id={self.id}, name='{self.name}', location='{self.location}')"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            # Add other fields as needed
        }

    def to_dict_with_pizzas(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'pizzas': [pizza.to_dict() for pizza in self.restaurant_pizzas]
        }

# RestaurantPizza class representing the 'restaurant_pizzas' table
class RestaurantPizza(db.Model, SerializerMixin):
    __tablename__ = 'restaurant_pizzas'

    # Columns in the 'restaurant_pizzas' table
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizzas.id'), nullable=False)

    # Validation for the 'price' column
    @validates('price')
    def validate_price(self, key, value):
        if not (1 <= value <= 30):
            raise ValueError("Price must be between 1 and 30")
        return value

    def to_dict(self):
        return {
            'id': self.id,
            'price': self.price,
        }

    
    def to_dict_with_pizzas(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'pizzas': [pizza.to_dict() for pizza in self.pizzas],
        }

    # Repr method for better representation
    def __repr__(self):
        return f"RestaurantPizza(id={self.id}, price={self.price}, restaurant_id={self.restaurant_id}, pizza_id={self.pizza_id})"
