import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI is missing from the environment variables.")

client = AsyncIOMotorClient(MONGO_URI)

# Database and Collection definitions
db = client.career_copilot
users_collection = db.users_state

# 👇 MAKE SURE THIS LINE EXISTS AND IS SPELLED EXACTLY LIKE THIS 👇
profiles_collection = db.users_profile 

print(" MongoDB Atlas client initialized successfully.")