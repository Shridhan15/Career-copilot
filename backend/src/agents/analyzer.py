from typing import List
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq
from src.state import CopilotState

class StrictAnalysisOutput(BaseModel):
    """The structured schema forcing the LLM to separate matches from gaps."""
    matching_skills: List[str] = Field(
        ..., 
        description="ONLY the technical skills from the candidate's resume that directly align with or are useful for the target role."
    )
    skill_gaps: List[str] = Field(
        ..., 
        description="Core technical skills, tools, cloud providers, or methodologies required for the target role that are completely MISSING or weak in the candidate's resume."
    )
    justification: str = Field(..., description="A brutal, honest evaluation of their readiness.")

def gap_analyzer_node(state: CopilotState) -> dict:
    """
    Agent Node: Acts as a strict technical interviewer. Filters matching skills
    and lists missing gaps relative to the specific target role.
    """
    # Using Llama 3.1 70B for high-fidelity compliance to instructions
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.0)
    structured_llm = llm.with_structured_output(StrictAnalysisOutput)

    extracted_skills = state.extracted_profile.skills if state.extracted_profile else []
    target_job = state.target_role

    system_prompt = (
        f"You are a brutal, expert Technical Screener evaluating candidates specifically for a '{target_job}' role. "
        "Your job is to look at the candidate's extracted skills and filter them strictly. "
        "Do NOT be nice. If a skill does not directly apply to the target role architecture, do NOT include it in matching_skills. "
        "Identify every critical industry standard tool, framework, and cloud service they are missing for this specific role."
    )

    user_content = (
        f"Target Role: {target_job}\n"
        f"Candidate Resume Skills: {', '.join(extracted_skills)}\n\n"
        "Filter the matching skills, list the brutal gaps, and provide your justification."
    )

    # Invoke Groq
    analysis: StrictAnalysisOutput = structured_llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content}
    ])

    # Calculate a REAL, un-hallucinated score based ONLY on role-relevant metrics
    matches_count = len(analysis.matching_skills)
    gaps_count = len(analysis.skill_gaps)
    total_footprint = matches_count + gaps_count

    if total_footprint > 0:
        # Score is purely matching skills divided by total required skills for the role
        calculated_score = round((matches_count / total_footprint) * 100, 1)
    else:
        calculated_score = 0.0

    # Overwrite extracted profile skills with ONLY the matching ones for the UI, 
    # and save the true gaps and score.
    # 1. Safely dump the existing profile to a dictionary if it exists
    profile_dict = state.extracted_profile.model_dump() if state.extracted_profile else {}
    
    # 2. Explicitly overwrite or set the skills key to contain ONLY the matching skills
    profile_dict["skills"] = analysis.matching_skills

    # 3. Return clean updates to the master state
    return {
        "extracted_profile": profile_dict,
        "skill_gaps": analysis.skill_gaps,
        "readiness_score": calculated_score
    }