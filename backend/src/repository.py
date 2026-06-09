from typing import Dict, Any, Optional
from src.database import users_collection, profiles_collection
from datetime import datetime # <-- Add this new import

class UserRepository:
    # ==========================================
    # 1. AI Analysis State Methods
    # ==========================================
    @staticmethod
    async def save_user_state(user_id: str, state_data: Dict[str, Any]) -> bool:
        """Pushes a new AI analysis into the user's history array."""
        # Add a timestamp so we know when this was generated
        state_data["timestamp"] = datetime.utcnow().isoformat()
        
        result = await users_collection.update_one(
            {"user_id": user_id},
            {
                "$push": {
                    "history": {
                        "$each": [state_data],
                        "$position": 0  # This puts the newest analysis at the top of the list!
                    }
                }
            },
            upsert=True
        )
        return result.acknowledged

    @staticmethod
    async def get_user_state(user_id: str) -> list: # <-- Now returns a list
        """Retrieves the array of past analyses for a specific user."""
        user_data = await users_collection.find_one({"user_id": user_id})
        
        # If the user exists and has a history array, return it
        if user_data and "history" in user_data:
            return user_data["history"]
            
        return [] # Return empty list if brand new user