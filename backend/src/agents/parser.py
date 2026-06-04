from langchain_groq import ChatGroq
from src.state import CopilotState, ExtractedProfile

def resume_parser_node(state: CopilotState) -> dict:
    """
    Agent Node: Parses raw resume text into a structured Pydantic schema
    using OpenAI's function calling/structured output capabilities.
    """
    # Ensure there is raw text to parse
    if not state.raw_resume_text or not state.raw_resume_text.strip():
        raise ValueError("No raw resume text found in the global state to parse.")

    # Initialize the LLM
    # We use temperature=0.0 because parsing requires absolute accuracy, not creativity.
    llm = ChatGroq(model="llama-3.3-70b-versatile", temperature=0.0)

    # Bind the structured output schema directly to the model
    structured_llm = llm.with_structured_output(ExtractedProfile)

    # System prompt instructing the model on its parsing criteria
    system_prompt = (
        "You are an expert ATS (Applicant Tracking System) optimization agent. "
        "Your task is to analyze the following raw text from a candidate's resume "
        "and extract their technical skills, project portfolio, professional experience, "
        "and educational background. Ensure all skills are cataloged cleanly into standard industry keywords."
    )

    # Execute the structured extraction
    parsed_profile = structured_llm.invoke([
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": state.raw_resume_text}
    ])

    # Return the dictionary update to modify the global LangGraph state
    return {
        "extracted_profile": parsed_profile
    }