from langgraph.graph import StateGraph, END
from src.state import CopilotState
from src.agents.parser import resume_parser_node
from src.agents.analyzer import gap_analyzer_node

# 1. Initialize the Graph with our strict Pydantic State
workflow = StateGraph(CopilotState)

# 2. Add our AI Agents as nodes
workflow.add_node("parser_agent", resume_parser_node)
workflow.add_node("analyzer_agent", gap_analyzer_node)

# 3. Define the flow (The pipeline)
workflow.set_entry_point("parser_agent")
workflow.add_edge("parser_agent", "analyzer_agent")
workflow.add_edge("analyzer_agent", END)

# 4. Compile the graph into an executable application
app_graph = workflow.compile()