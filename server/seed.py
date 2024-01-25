# seed.py

import random
import uuid
from faker import Faker
from app import app, db
from models import User, Photo, Like

fake = Faker()

def rc(collection):
    """Random choice from collection"""
    return random.choice(collection)


users_images = [
    "https://images.freeimages.com/images/large-previews/aed/three-bees-on-sunflower-1337029.jpg?fmt=webp&h=350",
    "https://images.freeimages.com/images/large-previews/77c/nemo-the-horse-1339807.jpg?fmt=webp&w=500",
    "https://images.freeimages.com/images/large-previews/c31/colors-1383652.jpg?fmt=webp&w=500",
    "https://images.freeimages.com/images/large-previews/9c0/forest-1400475.jpg?fmt=webp&w=500",
    "https://images.freeimages.com/images/large-previews/c0d/gerbera-series-1-1486599.jpg?fmt=webp&w=500",
    "https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    "https://images.freeimages.com/variants/DVg6TTGcRiJSdhEbY212DbAu/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    "https://images.freeimages.com/variants/k1wQB7egQotJ7Hr3ZBPP1S5c/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    "https://images.freeimages.com/variants/h5x75mMzcK26DrsoLKqg3AEi/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500",
    "https://images.freeimages.com/variants/59tZ1h89y8fuRnBcqUuUjEWo/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500"

]

with app.app_context():
    print("Clearing database...")
    User.query.delete()
    Photo.query.delete()
    Like.query.delete()

    print("🦸‍♀️ Seeding users...")
    user_ids = []
    for i in range(20):
        new_user = User(
            username=f'{fake.unique.first_name()}{fake.unique.last_name()}',
            password=fake.password(),
        )
        db.session.add(new_user)
        db.session.commit()
        user_ids.append(new_user.id)

    print("🦸‍♀️ Seeding photos...")
    photo_ids = []
    for i in range(30):
        new_photo = Photo(
            title=fake.sentence(),
            description=fake.paragraph(),
            user_id=rc(user_ids),
            region=fake.word(),
            create_time=fake.date_time_this_decade(),
            size=random.randint(1, 10),
            image_url=rc(users_images)
        )
        db.session.add(new_photo)
        db.session.commit()
        photo_ids.append(new_photo.id)

    print("🦸‍♀️ Seeding likes...")
    for _ in range(50):
        user_id = rc(user_ids)
        photo_id = rc(photo_ids)

        # Ensure a user doesn't like their own photo
        while Photo.query.get(photo_id).user_id == user_id:
            photo_id = rc(photo_ids)

        new_like = Like(
            user_id=user_id,
            photo_id=photo_id,
        )
        db.session.add(new_like)
        db.session.commit()

    print("🦸‍♀️ Seeding complete!")
