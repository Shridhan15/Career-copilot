from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid

from src.graph import app_graph

app = FastAPI(title="Career Copilot API")

# Setup CORS so your React frontend (localhost:5173) can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for local development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the expected JSON payload from the frontend
class AnalyzeRequest(BaseModel):
    resume_text: str
    target_role: str

@app.post("/api/analyze")
async def analyze_resume(request: AnalyzeRequest):
    try:
        # 1. Initialize the starting state for LangGraph
        initial_state = {
            "user_id": str(uuid.uuid4()),
            "target_role": request.target_role,
            "raw_resume_text": request.resume_text
        }
        
        # 2. Execute the AI Multi-Agent Workflow
        print("Starting AI Pipeline...")
        final_state = app_graph.invoke(initial_state)
        print("Pipeline Complete!")
        
        # 3. Return the specific data the React UI needs
        return {
            "readiness_score": final_state.get("readiness_score", 0),
            "extracted_profile": final_state.get("extracted_profile", {}),
            "skill_gaps": final_state.get("skill_gaps", [])
        }
        
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))