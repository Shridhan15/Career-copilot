from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class ExtractedProfile(BaseModel):
    """The structured data extracted from a raw resume text."""
    skills: List[str] = Field(default_factory=list, description="List of technical skills, frameworks, and tools.")
    projects: List[Dict[str, Any]] = Field(default_factory=list, description="List of projects with title and description.")
    experience: List[Dict[str, Any]] = Field(default_factory=list, description="Work experience details.")
    education: List[Dict[str, Any]] = Field(default_factory=list, description="Academic background.")

class RoadmapModule(BaseModel):
    """A specific topic/skill module within a month's roadmap."""
    topic: str = Field(..., description="The name of the skill or concept (e.g., PyTorch, RAG).")
    resources: List[str] = Field(default_factory=list, description="Curated high-quality documentation links or tutorial keywords.")
    suggested_project: str = Field(..., description="A micro-project to build to validate this skill.")

class CopilotState(BaseModel):
    """The global, centralized state for the AI Career Copilot workflow."""
    user_id: str = Field(..., description="Unique identifier for the user.")
    target_role: str = Field(..., description="The dream job selected by the user (e.g., AI Engineer).")
    raw_resume_text: str = Field(default="", description="The unparsed string text extracted from the uploaded PDF resume.")
    
    # AI Engine Outputs
    extracted_profile: Optional[ExtractedProfile] = Field(default=None, description="The parsed resume data.")
    skill_gaps: List[str] = Field(default_factory=list, description="List of skills required for the target role but missing from the resume.")
    
    # The Chronological Roadmap (e.g., {"Month 1": [RoadmapModule, RoadmapModule], "Month 2": [...]})
    active_roadmap: Dict[str, List[RoadmapModule]] = Field(default_factory=dict, description="The personalized chronological roadmap.")
    
    # Interview Tracking
    current_interview_topic: Optional[str] = Field(default=None, description="The topic currently being evaluated in the mock interview.")
    interview_history: List[Dict[str, Any]] = Field(default_factory=list, description="Chat logs and granular scores of the mock interview sessions.")
    
    # Global Metric
    readiness_score: float = Field(default=0.0, description="Overall matching index score (0 to 100%) calculated by the AI engine.")