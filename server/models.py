from sqlalchemy.orm import validates
from sqlalchemy import MetaData, UniqueConstraint, ForeignKey, Table
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Many-to-Many Relationship Table
user_photo_interaction = Table(
    'user_photo_interaction',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('photo_id', db.Integer, db.ForeignKey('photo.id'))
)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    photos = db.relationship('Photo', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username
            # Add other fields as needed
        }


# Photo model
class Photo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    likes = db.relationship('Like', backref='photo', lazy=True)
    
    # New fields
    region = db.Column(db.String(50))
    create_time = db.Column(db.DateTime)
    size = db.Column(db.Integer)
    image_url = db.Column(db.String(255))  # Assuming URL length is 255 characters

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'user_id': self.user_id,
            'region': self.region,
            'create_time': self.create_time,
            'size': self.size,
            'image_url': self.image_url
            # Add other fields as needed
        }


# Like model (many-to-many relationship between User and Photo)
class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.photo_id
            # Add other fields as needed
        }
