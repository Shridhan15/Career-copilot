from typing import List
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.repository import UserRepository
from src.graph import app_graph

app = FastAPI(title="Career Copilot Backend")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your specific frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 1. Pydantic Schemas
# ==========================================
class UserStatePayload(BaseModel):
    target_role: str
    skills: List[str]
    skill_gaps: List[str]
    readiness_score: float
    active_roadmap: dict

class PersonalInfoSchema(BaseModel):
    fullName: str
    email: str
    phone: str
    location: str

class EducationSchema(BaseModel):
    id: int
    institution: str
    degree: str
    startYear: str
    endYear: str

class UserProfilePayload(BaseModel):
    personalInfo: PersonalInfoSchema
    education: List[EducationSchema]


# ==========================================
# 2. State API Endpoints (AI Analysis Data)
# ==========================================
@app.post("/api/user/{user_id}/state", status_code=status.HTTP_200_OK)
async def save_profile_state(user_id: str, payload: UserStatePayload):
    """Saves or overwrites the user's career copilot state."""
    state_dict = payload.model_dump()
    success = await UserRepository.save_user_state(user_id, state_dict)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Failed to persist data to MongoDB Atlas."
        )
    return {"status": "success", "message": "User state synchronized successfully."}

@app.get("/api/user/{user_id}/state")
async def fetch_profile_state(user_id: str):
    """Retrieves a user's entire analysis history."""
    history_array = await UserRepository.get_user_state(user_id)
    
    # We no longer throw a 404. We just return the array (even if it is empty).
    # React prefers receiving empty arrays [] rather than error codes.
    return history_array


# ==========================================
# 3. Profile API Endpoints (User Details)
# ==========================================
@app.post("/api/user/{user_id}/profile", status_code=status.HTTP_200_OK)
async def save_profile(user_id: str, payload: UserProfilePayload):
    """Saves user personal info and education to the profiles collection."""
    profile_dict = payload.model_dump()
    success = await UserRepository.save_user_profile(user_id, profile_dict)
    
    if not success:
        raise HTTPException(status_code=500, detail="Failed to save profile to Atlas.")
    return {"status": "success", "message": "Profile saved securely."}

@app.get("/api/user/{user_id}/profile")
async def get_profile(user_id: str):
    """Fetches the user profile data."""
    profile_data = await UserRepository.get_user_profile(user_id)
    if not profile_data:
        raise HTTPException(status_code=404, detail="Profile not found.")
    return profile_data



# ==========================================
# 4. AI Analysis Endpoint
# ==========================================
class AnalyzeRequest(BaseModel):
    user_id: str
    resume_text: str
    target_role: str

@app.post("/api/analyze")
async def analyze_resume(request: AnalyzeRequest):
    try:
        # 1. Initialize the starting state
        initial_state = {
            "user_id": request.user_id,
            "target_role": request.target_role,
            "raw_resume_text": request.resume_text
        }
        
        # 2. Execute the AI Multi-Agent Workflow
        print(f"Starting AI Pipeline for user: {request.user_id}...")
        final_state = app_graph.invoke(initial_state) 
        print("Pipeline Complete!")
        
        # 3. Structure the final data payload
        result_data = {
            "target_role": request.target_role,
            "readiness_score": final_state.get("readiness_score", 0),
            "extracted_profile": final_state.get("extracted_profile", {}),
            "skill_gaps": final_state.get("skill_gaps", []),
            "skills": final_state.get("extracted_profile", {}).get("skills", []), 
            "active_roadmap": final_state.get("active_roadmap", {})
        }
        
        # 4. NEW: Save the AI results directly to MongoDB Atlas!
        save_success = await UserRepository.save_user_state(request.user_id, result_data)
        if save_success:
            print(f"✅ Successfully saved analysis to database for {request.user_id}")
        else:
            print(f"⚠️ Warning: Failed to save to database for {request.user_id}")

        # 5. Return the data to the React UI
        return result_data
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))