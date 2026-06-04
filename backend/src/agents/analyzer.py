from typing import List
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq
from src.state import CopilotState
from dotenv import load_dotenv
load_dotenv()  # Load environment variables from .env file, including GROQ_API_KEY


class AnalysisOutput(BaseModel):
    """The structured schema expected from the Gap Analyzer LLM."""
    skill_gaps: List[str] = Field(..., description="List of core technical skills required for the target role that are missing or weak in the candidate's profile.")
    justification: str = Field(..., description="A short, professional explanation of why these gaps matter for the target role.")

def gap_analyzer_node(state: CopilotState) -> dict:
    """
    Agent Node: Composed for Groq. Compares extracted profile skills against 
    the target role requirements to isolate skill gaps and compute a readiness score.
    """
    # 1. Initialize ChatGroq with a fast, reasoning-capable model
    # llama3-70b-8192 or llama-3.1-70b-versatile are ideal for analytical constraints
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.0)
    
    # Force structured output mapped to our local schema
    structured_llm = llm.with_structured_output(AnalysisOutput)

    # 2. Prepare context from the state
    extracted_skills = state.extracted_profile.skills if state.extracted_profile else []
    target_job = state.target_role

    system_prompt = (
        "You are an elite Technical Recruiter and Career Strategist. Your job is to strictly "
        "compare a candidate's current technical skill array against the standard production-level "
        "expectations of their target dream job. Identify exactly what advanced libraries, design patterns, "
        "or tools they are missing to be highly competitive for this role."
    )

    user_content = (
        f"Target Role: {target_job}\n"
        f"Candidate Current Skills: {', '.join(extracted_skills) if extracted_skills else 'None detected'}\n\n"
        f"Analyze the differences, list out missing competencies, and provide a clear justification."
    )

    # 3. Invoke Groq
    analysis: AnalysisOutput = structured_llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content}
    ])

    # 4. Calculate a weighted mathematical Readiness Score
    # Simple formula: Percentage of matching baseline competencies
    # In a fully-scaled app, this could be cross-checked with a Vector Database matrix.
    total_skills_considered = len(extracted_skills) + len(analysis.skill_gaps)
    
    if total_skills_considered > 0:
        # Give weight to matching skills out of the total required footprint
        calculated_score = round((len(extracted_skills) / total_skills_considered) * 100, 1)
    else:
        calculated_score = 0.0

    # 5. Return the updates to the master state
    return {
        "skill_gaps": analysis.skill_gaps,
        "readiness_score": calculated_score
    }