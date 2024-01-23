from app import app, db
from models import User, Photo, Category, Comment
import bcrypt

# Function to seed the database with initial data
def seed_database():
    with app.app_context():
        # Create tables
        db.create_all()

        # Seed Categories
        category1 = Category(name='Nature')
        category2 = Category(name='Animals')
        db.session.add_all([category1, category2])
        db.session.commit()

        # Seed Users
        password_hash = bcrypt.hashpw('password'.encode('utf-8'), bcrypt.gensalt())
        user1 = User(username='user1', email='user1@example.com', password_hash=password_hash)
        user2 = User(username='user2', email='user2@example.com', password_hash=password_hash)
        db.session.add_all([user1, user2])
        db.session.commit()

        # Seed Photos
        photo1 = Photo(name='Sunset', description='Beautiful sunset', price=20.00, user=user1, category=category1)
        photo2 = Photo(name='Cute Puppy', description='Adorable puppy', price=15.00, user=user2, category=category2)
        db.session.add_all([photo1, photo2])
        db.session.commit()

        # Seed Comments
        comment1 = Comment(user=user1, photo=photo2, content='Great photo!')
        comment2 = Comment(user=user2, photo=photo1, content='Amazing sunset!')
        db.session.add_all([comment1, comment2])
        db.session.commit()

        print("Database seeded successfully")

if __name__ == '__main__':
    seed_database()
