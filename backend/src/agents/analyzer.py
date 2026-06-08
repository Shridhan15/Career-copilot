from typing import List
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq
from src.state import CopilotState
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

# ==========================================
# 1. THE ROLE CONFIGURATION DICTIONARY
# ==========================================
# Add new roles here without ever needing to change the LangGraph node logic!
ROLE_RULES = {
    "Cloud Architect": {
        "core_examples": "AWS, GCP, Azure, Terraform, Kubernetes, Docker, CI/CD, VPCs, IAM, Infrastructure as Code.",
        "trash_examples": "Frontend frameworks (React, Vue), Application-level APIs (OpenAI, Stripe), UI/UX tools, standard web backend frameworks (Django) unless used for serverless functions."
    },
    "AI Engineer": {
        "core_examples": "LangChain, LangGraph, CrewAI, LLM APIs (OpenAI, Groq, Anthropic), Vector DBs (Pinecone, Milvus), PyTorch, TensorFlow, RAG architectures.",
        "trash_examples": "Frontend styling (Tailwind, CSS), standard web hosting, mobile app frameworks (React Native), unrelated UI/UX."
    },
    "Full Stack Developer": {
        "core_examples": "React, Node.js, MongoDB, Express, Next.js, REST APIs, GraphQL, SQL, authentication (OAuth, JWT).",
        "trash_examples": "Deep learning math, heavy infrastructure provisioning (Terraform), foundational model training."
    },
    "Data Scientist": {
        "core_examples": "Pandas, NumPy, Scikit-learn, SQL, Python, R, Jupyter, Statistical Modeling, Data Visualization (Tableau, Matplotlib).",
        "trash_examples": "Frontend web development (React, HTML/CSS), mobile app dev, heavy cloud infrastructure management."
    }
}

# ==========================================
# 2. THE LLM OUTPUT SCHEMA (The Trash Can)
# ==========================================
class StrictAnalysisOutput(BaseModel):
    """The structured schema forcing the LLM to separate matches, gaps, and trash."""
    matching_skills: List[str] = Field(
        ..., 
        description="ONLY the absolute core technical skills from the resume that are strictly required for the target role."
    )
    irrelevant_skills: List[str] = Field(
        ...,
        description="The 'Trash Can'. List all candidate skills that are tangential, application-layer, or irrelevant based on the TRASH rules."
    )
    skill_gaps: List[str] = Field(
        ..., 
        description="Core technical skills, tools, or methodologies required for the target role that are completely MISSING from the resume."
    )
    justification: str = Field(..., description="A brutal, honest evaluation of their readiness.")

# ==========================================
# 3. THE ANALYZER AGENT NODE
# ==========================================
def gap_analyzer_node(state: CopilotState) -> dict:
    """
    Agent Node: Acts as a strict technical interviewer. Filters matching skills,
    throws away tangential skills, and lists missing gaps relative to the specific role.
    """
    # Initialize Groq LLM (temperature 0.0 for strict logic constraints)
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.0)
    structured_llm = llm.with_structured_output(StrictAnalysisOutput)

    extracted_skills = state.extracted_profile.skills if state.extracted_profile else []
    target_job = state.target_role

    # Dynamically fetch the rules for the selected role. 
    # If the role isn't in the dictionary, provide a safe generic fallback.
    rules = ROLE_RULES.get(target_job, {
        "core_examples": "industry standard backend, frontend, or systems tools relevant to the title.",
        "trash_examples": "unrelated hobbies, non-technical skills, or tools from completely different engineering domains."
    })

    # The prompt dynamically injects the rules specific to the user's role
    system_prompt = (
        f"You are a brutal, expert Technical Screener evaluating candidates specifically for a '{target_job}' role. "
        "Your job is to categorize the candidate's extracted skills. "
        "CRITICAL INSTRUCTION: You must filter skills based strictly on this role's domain. "
        f"1. CORE SKILLS to keep in 'matching_skills' include: {rules['core_examples']} "
        f"2. TRASH SKILLS to throw in 'irrelevant_skills' include: {rules['trash_examples']} "
        "Do NOT mix them up. What is core for one role might be trash for another. Follow the rules above strictly. "
        "Identify massive critical industry-standard gaps in 'skill_gaps'."
    )

    user_content = (
        f"Target Role: {target_job}\n"
        f"Candidate Resume Skills: {', '.join(extracted_skills)}\n\n"
        "Filter the matching skills, throw away the irrelevant ones, list the brutal gaps, and provide your justification."
    )

    # Invoke Groq
    analysis: StrictAnalysisOutput = structured_llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content}
    ])

    # Calculate score based ONLY on the strictly filtered matches
    matches_count = len(analysis.matching_skills)
    gaps_count = len(analysis.skill_gaps)
    total_footprint = matches_count + gaps_count

    if total_footprint > 0:
        calculated_score = round((matches_count / total_footprint) * 100, 1)
    else:
        calculated_score = 0.0

    # Safely dump the existing profile
    profile_dict = state.extracted_profile.model_dump() if state.extracted_profile else {}
    
    # Overwrite the UI's skill list to ONLY show the brutally filtered matching skills.
    # The 'irrelevant_skills' are left behind, ensuring the frontend only displays what matters.
    profile_dict["skills"] = analysis.matching_skills

    # Return clean updates to the master state
    return {
        "extracted_profile": profile_dict,
        "skill_gaps": analysis.skill_gaps,
        "readiness_score": calculated_score
    }