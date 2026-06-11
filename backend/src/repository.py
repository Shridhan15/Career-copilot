from typing import Dict, Any, Optional
from src.database import users_collection, profiles_collection
from datetime import datetime

class UserRepository:
    # ==========================================
    # 1. AI Analysis State Methods (Dashboard History)
    # ==========================================
    @staticmethod
    async def save_user_state(user_id: str, state_data: Dict[str, Any]) -> bool:
        """Pushes a new AI analysis into the user's history array."""
        state_data["timestamp"] = datetime.utcnow().isoformat()
        
        result = await users_collection.update_one(
            {"user_id": user_id},
            {
                "$push": {
                    "history": {
                        "$each": [state_data],
                        "$position": 0  # Puts newest at the top
                    }
                }
            },
            upsert=True
        )
        return result.acknowledged

    @staticmethod
    async def get_user_state(user_id: str) -> list:
        """Retrieves the array of past analyses for a specific user."""
        user_data = await users_collection.find_one({"user_id": user_id})
        
        if user_data and "history" in user_data:
            return user_data["history"]
            
        return []

    # ==========================================
    # 2. User Profile Methods (Career Setup / Education)
    # ==========================================
    @staticmethod
    async def save_user_profile(user_id: str, profile_data: Dict[str, Any]) -> bool:
        """Saves or updates the user's static profile details."""
        profile_data["user_id"] = user_id
        
        result = await profiles_collection.update_one(
            {"user_id": user_id},
            {"$set": profile_data},
            upsert=True
        )
        return result.acknowledged

    @staticmethod
    async def get_user_profile(user_id: str) -> Optional[Dict[str, Any]]:
        """Retrieves the user's profile details."""
        profile_data = await profiles_collection.find_one({"user_id": user_id})
        if profile_data:
            profile_data.pop("_id", None)
            return profile_data
        return None