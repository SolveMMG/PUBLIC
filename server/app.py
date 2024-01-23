from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db, User, Photo, Category, Comment, user_photo_interaction
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///photo-user.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'vsgewvwesvsgevafdsag'

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Routes

# User authentication
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()

    if user and user.check_password(data['password']):
        access_token = create_access_token(identity=user.public_id)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

# User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = User(username=data['username'], email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

# Retrieve all users
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

# Retrieve a specific user
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"message": "User not found"}), 404

# Update user information
@app.route('/user/<int:user_id>', methods=['PUT'])
@jwt_required()
def update_user(user_id):
    current_user = get_jwt_identity()
    if current_user != user_id:
        return jsonify({"message": "Unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    user.username = data.get('username', user.username)
    user.email = data.get('email', user.email)

    db.session.commit()
    return jsonify({"message": "User updated successfully"}), 200

# Delete user
@app.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    if current_user != user_id:
        return jsonify({"message": "Unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200

# Photo CRUD operations
@app.route('/photos', methods=['GET', 'POST'])
@jwt_required()
def photos():
    current_user = get_jwt_identity()

    if request.method == 'GET':
        photos = Photo.query.all()
        return jsonify([photo.serialize() for photo in photos]), 200

    elif request.method == 'POST':
        data = request.get_json()
        new_photo = Photo(name=data['name'], description=data['description'], price=data['price'], user_id=current_user)
        db.session.add(new_photo)
        db.session.commit()
        return jsonify({"message": "Photo created successfully"}), 201

# Like and unlike a photo
@app.route('/like/<int:photo_id>', methods=['POST', 'DELETE'])
@jwt_required()
def like_unlike_photo(photo_id):
    current_user = get_jwt_identity()
    photo = Photo.query.get(photo_id)

    if request.method == 'POST':
        current_user = User.query.filter_by(public_id=current_user).first()
        photo.liked_by.append(current_user)
        db.session.commit()
        return jsonify({"message": "Photo liked successfully"}), 200

    elif request.method == 'DELETE':
        current_user = User.query.filter_by(public_id=current_user).first()
        photo.liked_by.remove(current_user)
        db.session.commit()
        return jsonify({"message": "Photo unliked successfully"}), 200

# Display photo information
@app.route('/photo/<int:photo_id>', methods=['GET'])
def get_photo(photo_id):
    photo = Photo.query.get(photo_id)
    return jsonify(photo.serialize()), 200

# Comment on a photo
@app.route('/comment/<int:photo_id>', methods=['POST'])
@jwt_required()
def add_comment(photo_id):
    data = request.get_json()
    current_user = get_jwt_identity()
    new_comment = Comment(user_id=current_user, photo_id=photo_id, content=data['content'])
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"message": "Comment added successfully"}), 201



if __name__ == '__main__':
    app.run(debug=True)
