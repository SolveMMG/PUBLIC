from sqlalchemy.orm import validates
from sqlalchemy import MetaData, UniqueConstraint, ForeignKey, Table
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from werkzeug.security import generate_password_hash
from flask_jwt_extended import create_access_token


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Many-to-Many Relationship Table
user_photo_interaction = Table(
    'user_photo_interaction',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('photo_id', db.Integer, db.ForeignKey('photos.id'))
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String)
    username = db.Column(db.String)
    email = db.Column(db.String)
    password_hash = db.Column(db.String)
    profile_pic = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    photos = db.relationship('Photo', back_populates='user', cascade='all, delete-orphan')
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    liked_photos = db.relationship('Photo', secondary=user_photo_interaction, back_populates='liked_by')

    __table_args__ = (UniqueConstraint('username', name='user_unique_constraint'),)

    def __repr__(self):
        return f'(id={self.id}, name={self.username} email={self.email} profile_pic={self.profile_pic})'

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    def generate_access_token(self, expires_in=604800):  # Token expires in 7 days by default
        return create_access_token(identity=str(self.id), expires_delta=expires_in)

   


class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    price = db.Column(db.Numeric(precision=10, scale=2))
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    category_id = db.Column(db.Integer, ForeignKey('categories.id'))
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    category = db.relationship('Category', back_populates='photos')
    user = db.relationship('User', back_populates='photos')
    comments = db.relationship('Comment', back_populates='photo', cascade='all, delete-orphan')
    liked_by = db.relationship('User', secondary=user_photo_interaction, back_populates='liked_photos')

    __table_args__ = (UniqueConstraint('name', name='img_name_unique_constraint'),)

    def __repr__(self):
        return f'(id={self.id}, name={self.name} description={self.description} price={self.price} price={self.image} user_id={self.user_id} category_id={self.category_id} )'


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('users.id'))
    photo_id = db.Column(db.Integer, ForeignKey('photos.id'))
    content = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    user = db.relationship('User', back_populates='comments')
    photo = db.relationship('Photo', back_populates='comments')

    @validates('user_id')
    def validate_user_id(self, key, user_id):
        if self.photo.user_id != user_id:
            raise ValueError("You can only add comments as the owner of the photo.")
        return user_id

    def __repr__(self):
        return f'(id={self.id}, user_id={self.user_id}, photo_id={self.photo_id}, content={self.content})'


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    photos = db.relationship('Photo', back_populates='category', cascade='all, delete-orphan')

    def __repr__(self):
        return f'(id={self.id}, name={self.name})'
