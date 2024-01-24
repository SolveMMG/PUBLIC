import random
from app import app, db
from models import Pizza, Restaurant, RestaurantPizza

# Pushing the app context to allow interacting with the database
app.app_context().push()

# Clearing the database
print("🧹 Clearing the database...")
Pizza.query.delete()
Restaurant.query.delete()
RestaurantPizza.query.delete()

# Seeding pizzas
print("🍕 Seeding pizzas...")
pizzas = [
    {"name": "Margherita", "toppings": "Tomato, Mozzarella, Basil"},
    {"name": "Pepperoni", "toppings": "Pepperoni, Tomato sauce, Cheese"},
    {"name": "Vegetarian", "toppings": "Mushrooms, Peppers, Onions, Tomato sauce, Cheese"},
    {"name": "Hawaiian", "toppings": "Ham, Pineapple, Tomato sauce, Cheese"}
]

# Loop through pizza data and add to the database
for pizza_data in pizzas:
    pizza = Pizza(name=pizza_data["name"], toppings=pizza_data["toppings"])
    db.session.add(pizza)

# Seeding restaurants
print("🍕 Seeding restaurants...")
restaurants = [
    {"name": "Luigi's Pizza", "location": "123 Main St"},
    {"name": "Tony's Pizzeria", "location": "456 Oak St"},
    {"name": "Mamma Mia Pizzeria", "location": "789 Elm St"}
]

# Loop through restaurant data and add to the database
for restaurant_data in restaurants:
    restaurant = Restaurant(name=restaurant_data["name"], location=restaurant_data["location"])
    db.session.add(restaurant)

# Seeding restaurant_pizzas
print("🍕 Seeding restaurant_pizzas...")

# Loop to create 10 random associations between pizzas and restaurants with random prices
for _ in range(10):
    random_pizza = random.choice(Pizza.query.all())
    random_restaurant = random.choice(Restaurant.query.all())
    price = round(random.uniform(5, 25), 2)  # Random price between 5 and 25

    restaurant_pizza = RestaurantPizza(price=price, restaurant=random_restaurant, pizza=random_pizza)
    db.session.add(restaurant_pizza)

# Committing changes to the database
db.session.commit()

# Seeding process completed
print("🍕 Done seeding!")
