import os
import json
import base64
import numpy as np
import pandas as pd
from typing import List, Dict, Any, Optional, Union, Annotated
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import uuid
from io import BytesIO
from google import genai
from google.genai import types

# Initialize the application
app = FastAPI(title="Career Accessibility Platform API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Gemini
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
gemini_client = genai.Client(api_key=GEMINI_API_KEY)
gemini_model = "gemini-2.0-flash"

# Load courses data at startup
try:
    with open("courses.json", "r") as f:
        courses_data = json.load(f)
except FileNotFoundError:
    print("Warning: courses.json not found, using empty courses list")
    courses_data = []

# Initialize the embedding model
embedding_model = SentenceTransformer('all-MiniLM-L6-v2')  # Fast but effective model

# Pre-compute course embeddings
course_descriptions = []
for course in courses_data:
    # Combine name and abstract for better representation
    combined_text = f"{course['course_name']} {course.get('abstract', '')}"
    course_descriptions.append(combined_text)

# Generate and store embeddings
course_embeddings = embedding_model.encode(course_descriptions) if course_descriptions else np.array([])

# ==================== Pydantic Models ====================

class SkillBase(BaseModel):
    name: str
    proficiency: Optional[str] = None
    context: Optional[str] = None

class ExperienceBase(BaseModel):
    role: str
    company: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    achievements: Optional[List[str]] = []

class EducationBase(BaseModel):
    institution: str
    degree: str
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    gpa: Optional[str] = None
    extras: Optional[str] = None

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    technologies: Optional[List[str]] = []
    url: Optional[str] = None

class CertificationBase(BaseModel):
    name: str
    issuer: Optional[str] = None
    date: Optional[str] = None
    expires: Optional[str] = None

class ResumeBase(BaseModel):
    full_text: Optional[str] = None
    parsed_sections: Optional[Dict[str, Any]] = {}
    skills: Optional[List[Dict[str, Any]]] = []
    experience: Optional[List[Dict[str, Any]]] = []
    education: Optional[List[Dict[str, Any]]] = []
    projects: Optional[List[Dict[str, Any]]] = []
    certifications: Optional[List[Dict[str, Any]]] = []
    file_type: Optional[str] = None

class ResumeUpload(BaseModel):
    file_content: Optional[str] = None
    file_type: str
    file_name: str

class JobBase(BaseModel):
    title: str
    company: str
    location: str
    salary: Optional[str] = None
    description_text: str
    isRemote: Optional[bool] = False
    category: Optional[str] = None
    accessibilityFeatures: Optional[List[str]] = []
    required_skills: Optional[List[Dict[str, Any]]] = []
    preferred_skills: Optional[List[Dict[str, Any]]] = []
    responsibilities: Optional[List[str]] = []
    qualifications: Optional[List[str]] = []

class ProfileBase(BaseModel):
    email: Optional[str]=None
    userType: str = Field(..., description="Can be 'job-seeker' or 'company'")
    name: Optional[str] = None
    
    # Job seeker fields
    disabilityType: Optional[str] = None
    education: Optional[str] = None
    experience: Optional[str] = None
    skills: Optional[str] = None
    certifications: Optional[str] = None
    jobtype: Optional[str] = None
    workpreference: Optional[str] = None
    accommodations: Optional[str] = None
    
    # Company fields
    company_name: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    company_website: Optional[str] = None
    accessibility_features: Optional[str] = None
    inclusion_initiatives: Optional[str] = None
    accommodation_support: Optional[str] = None
    hiring_timeline: Optional[str] = None
    open_positions: Optional[str] = None
    remote_policy: Optional[str] = None

class CourseRecommendation(BaseModel):
    course_id: int
    course_name: str
    abstract: Optional[str] = None
    instructor: Optional[str] = None
    relevance_score: float
    skill_match: List[str] = []
    course_url: Optional[str] = None

class CourseRecommendationRequest(BaseModel):
    profile_id: Optional[str] = None
    skills: List[str]
    desired_job: Optional[str] = None
    missing_skills: Optional[List[str]] = []
    limit: Optional[int] = 5

class SkillMatchResult(BaseModel):
    matched_skills: List[str]
    missing_skills: List[str]
    match_percentage: float
    job_compatibility: float

class ChatMessage(BaseModel):
    message: str
    profile: Optional[ProfileBase] = None
    history: Optional[List[Dict[str, str]]] = []

class JobMatchRequest(BaseModel):
    resume: ResumeBase
    job: JobBase

class JobMatchResponse(BaseModel):
    match_score: float
    match_details: Dict[str, Any]
    feedback: Dict[str, Any]

# ==================== Helper Functions ====================

async def call_gemini(prompt: str, file_path: str = None) -> Union[dict, str]:
    """Generic function to call Gemini API"""
    try:
        contents = [prompt]

        if file_path:
            mime_type = ".pdf"
            contents.append(types.Part.from_bytes(data=file_path, mime_type=mime_type))

        config = types.GenerateContentConfig()
        response = await gemini_client.aio.models.generate_content(
            model=gemini_model,
            contents=contents,
            config=config
        )

        if response.text:
            try:
                return parse_json(response.text)
            except:
                return response.text
        else:
            return {"error": "No text response from the model."}

    except Exception as e:
        return {"error": f"Gemini API call failed: {str(e)}"}

def parse_json(text):
    """Extract and parse JSON from text response"""
    start_idx = text.find('{')
    if start_idx == -1:
        raise ValueError("No JSON object found in the input string")
    
    stack = []
    in_string = False
    escaped = False
    
    for i in range(start_idx, len(text)):
        char = text[i]
        
        if in_string:
            if char == '\\' and not escaped:
                escaped = True
            elif char == '"' and not escaped:
                in_string = False
            else:
                escaped = False
        else:
            if char == '"':
                in_string = True
            elif char == '{':
                stack.append('{')
            elif char == '}':
                if not stack:
                    raise ValueError("Unbalanced braces in the input string")
                stack.pop()
            
                if not stack:
                    end_idx = i + 1
                    json_str = text[start_idx:end_idx]
                    try:
                        return json.loads(json_str)
                    except json.JSONDecodeError as e:
                        raise ValueError(f"Failed to parse JSON: {e}")
    
    raise ValueError("Unbalanced braces in the input string")

def get_mime_type(file_path: str) -> str:
    """Get MIME type for file upload"""
    file_extension = os.path.splitext(file_path)[1].lower()
    if file_extension == '.pdf':
        return 'application/pdf'
    elif file_extension in ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']:
        return f'image/{file_extension[1:]}'
    elif file_extension == '.txt':
        return 'text/plain'
    elif file_extension == '.docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    else:
        return 'application/octet-stream'

def extract_skills_from_text(text: str) -> List[str]:
    """Extract skills from text using a simple keyword approach"""
    common_skills = [
        'python', 'javascript', 'react', 'node.js', 'html', 'css', 'sql',
        'project management', 'leadership', 'communication', 'teamwork',
        'problem solving', 'critical thinking', 'time management'
    ]
    
    found_skills = []
    for skill in common_skills:
        if skill.lower() in text.lower():
            found_skills.append(skill)
            
    return found_skills

def get_course_recommendations(skills_needed: List[str], limit: int = 5) -> List[CourseRecommendation]:
    """Get course recommendations based on skills needed"""
    if not course_embeddings.size:
        return []
        
    # Generate embedding for the skills needed
    skills_text = " ".join(skills_needed)
    skills_embedding = embedding_model.encode([skills_text])[0]
    
    # Calculate similarity
    similarity_scores = cosine_similarity([skills_embedding], course_embeddings)[0]
    
    # Get top matches
    top_indices = similarity_scores.argsort()[-limit:][::-1]
    
    recommendations = []
    for idx in top_indices:
        course = courses_data[idx]
        
        # Extract skills taught in this course
        course_skills = extract_skills_from_text(
            f"{course['course_name']} {course.get('abstract', '')}"
        )
        
        # Find matching skills
        matching_skills = [skill for skill in course_skills if skill.lower() in [s.lower() for s in skills_needed]]
        
        recommendations.append(
            CourseRecommendation(
                course_id=course.get('course_id', idx),
                course_name=course['course_name'],
                abstract=course.get('abstract', ''),
                instructor=course.get('instructor', ''),
                relevance_score=float(similarity_scores[idx]),
                skill_match=matching_skills,
                course_url=course.get('course_url', '')
            )
        )
    
    return recommendations

# ==================== API Endpoints ====================

@app.post("/api/resume/parse", response_model=ProfileBase)
async def parse_resume(file: Optional[UploadFile] = None, file_content: Annotated[Optional[str], Form()]=None):
    """Parse a resume and return structured data"""
    if not file and not file_content:
        raise HTTPException(status_code=400, detail="Either file or file_content must be provided")
    
    # Handle file upload
    if file:
        # Save the uploaded file to a temporary location
        try:
            contents = await file.read()
            # Extract text from the resume using Gemini
            prompt = """
            Extract all text and key information from this resume.
            Return the extracted text in a clear, structured way.
            """
            
            resume_text = await call_gemini(prompt, contents)
        except Exception as e:
            print(e)
    else:
        # Handle base64 encoded file content
        try:
            resume_text = base64.b64decode(file_content).decode('utf-8')
        except Exception as e:
            print(e)

    
    # Parse the extracted text to fit our database schema
    prompt = f"""
    Based on the following resume text, extract information to fit the profile schema.
    
    Resume text:
    {resume_text}
    
    Return ONLY a valid JSON object with the following structure:
    {{
        "email": "email@example.com",
        "userType": "job-seeker",
        "name": "Full Name",
        "disabilityType": "Type of disability if mentioned",
        "education": "Education history in text format",
        "experience": "Work experience in text format",
        "skills": "Comma-separated list of skills",
        "certifications": "Any certifications mentioned",
        "jobtype": "Preferred job type if mentioned",
        "workpreference": "Remote, on-site, etc. if mentioned",
        "accommodations": "Any needed accommodations if mentioned"
    }}
    
    If some information is not found, use empty strings or null values.
    """
    
    profile_data = await call_gemini(prompt)
    
    if isinstance(profile_data, str):
        try:
            profile_data = json.loads(profile_data)
        except:
            profile_data = {
                "email": "unknown@example.com",
                "userType": "job-seeker",
                "name": "",
                "education": "",
                "experience": "",
                "skills": "",
                "certifications": ""
            }
    
    return ProfileBase(**profile_data)

@app.post("/api/jobs/match", response_model=JobMatchResponse)
async def match_job_with_resume(match_request: JobMatchRequest):
    """Match a job with a resume and return compatibility details"""
    job_data = match_request.job.model_dump()
    resume_data = match_request.resume.model_dump()
    
    # Format the data for Gemini
    prompt = f"""
    Analyze how well this resume matches the job description and return a detailed assessment.
    
    Resume:
    {json.dumps(resume_data)}
    
    Job Description:
    {json.dumps(job_data)}
    
    Return ONLY a valid JSON object with this exact structure:
    {{
      "overall_match": 75.5,
      "sections": {{
        "skills": {{
          "score": 80.0,
          "required": {{
            "matched": ["Python", "SQL"],
            "missing": ["Kubernetes"],
            "match_rate": 66.7
          }},
          "preferred": {{
            "matched": ["Docker"],
            "missing": ["AWS", "GraphQL"],
            "match_rate": 33.3
          }}
        }},
        "experience": {{
          "score": 70.0,
          "matching_aspects": ["Backend development", "Team leadership"],
          "missing_aspects": ["Enterprise architecture", "CI/CD pipelines"],
          "experience_entries": [
            {{
              "role": "Software Engineer",
              "company": "Tech Corp",
              "match_percentage": 75.0,
              "matching_terms": ["Python", "development", "leadership"]
            }}
          ]
        }},
        "education": {{
          "score": 85.0,
          "matching_aspects": ["Bachelor's degree in Computer Science"],
          "missing_aspects": [],
          "highest_education": "bachelor"
        }}
      }},
      "weights_applied": {{
        "skills": 0.6,
        "experience": 0.3,
        "education": 0.1
      }}
    }}
    
    Calculate overall_match as the weighted average of section scores.
    """
    
    match_details = await call_gemini(prompt)
    
    if not isinstance(match_details, dict):
        match_details = {
            "overall_match": 0.0,
            "sections": {
                "skills": {"score": 0.0, "required": {"matched": [], "missing": [], "match_rate": 0.0}, 
                           "preferred": {"matched": [], "missing": [], "match_rate": 0.0}},
                "experience": {"score": 0.0, "matching_aspects": [], "missing_aspects": [], "experience_entries": []},
                "education": {"score": 0.0, "matching_aspects": [], "missing_aspects": [], "highest_education": None}
            },
            "weights_applied": {"skills": 0.6, "experience": 0.3, "education": 0.1}
        }
    
    # Generate feedback based on the match details
    feedback_prompt = f"""
    Based on the job match analysis below, provide constructive feedback to improve the resume:
    
    Match Details:
    {json.dumps(match_details)}
    
    Provide personalized feedback in JSON format with these fields:
    {{
        "strengths": [
            "String describing a specific strength"
        ],
        "improvements": [
            "String describing a specific, actionable improvement"
        ],
        "missing_skills": [
            "Name of missing skill"
        ],
        "keyword_recommendations": [
            "Keyword to add to resume"
        ]
    }}
    
    Provide 3-5 items in each list. Be specific and actionable in your recommendations.
    """
    
    feedback = await call_gemini(feedback_prompt)
    
    if not isinstance(feedback, dict):
        feedback = {
            "strengths": ["No specific strengths identified"],
            "improvements": ["Consider providing more detailed information in your resume"],
            "missing_skills": [],
            "keyword_recommendations": []
        }
    
    # Calculate the match score
    match_score = match_details.get("overall_match", 0.0)
    
    return {
        "match_score": match_score,
        "match_details": match_details,
        "feedback": feedback
    }

@app.post("/api/courses/recommend", response_model=List[CourseRecommendation])
async def recommend_courses(request: CourseRecommendationRequest):
    """Recommend courses based on skills and job requirements"""
    # Combine existing skills and missing skills
    skills_to_search = request.skills.copy()
    
    # Add missing skills with higher priority
    if request.missing_skills:
        skills_to_search.extend(request.missing_skills)
    
    # If a desired job is specified, enhance the search with job-related terms
    if request.desired_job:
        skills_to_search.append(request.desired_job)
    
    # Get course recommendations
    recommendations = get_course_recommendations(skills_to_search, limit=request.limit)
    
    return recommendations

@app.post("/api/chat")
async def chat_with_assistant(chat_request: ChatMessage):
    """
    Chat with the career guidance assistant
    
    If a profile is provided, the response will be personalized based on the user's
    background, skills, disability information, and career preferences.
    """
    # Create system prompt for the career guidance chatbot
    system_prompt = """
    You are a career guidance assistant specializing in supporting people with various disabilities in their professional journeys. 
    Provide practical, actionable advice that considers both the realities of the job market and the unique considerations that may apply to people with disabilities.

    When responding:
    - Be empathetic but realistic and practical
    - Consider the whole person, not just their disability
    - Offer specific, actionable next steps when possible
    - Cover all career fields equally well, not focusing exclusively on tech
    - Balance technical skill development with soft skills advice
    - If user profile information is available, personalize your response accordingly

    Your goal is to help users navigate their career paths with confidence, providing honest guidance that acknowledges challenges while focusing on opportunities.
    """
    
    # Format the conversation history if provided
    conversation_context = ""
    if chat_request.history:
        for msg in chat_request.history:
            role = msg.get("role", "user")
            content = msg.get("content", "")
            conversation_context += f"{role.capitalize()}: {content}\n"
    
    # Add profile context if provided
    profile_context = ""
    if chat_request.profile:
        profile_data = chat_request.profile.model_dump(exclude_unset=True, exclude_none=True)
        profile_context = "User Profile Information:\n"
        
        # Add disability type if available
        if profile_data.get("disabilityType"):
            profile_context += f"- Disability type: {profile_data['disabilityType']}\n"
        
        # Add skills if available
        if profile_data.get("skills"):
            profile_context += f"- Skills: {profile_data['skills']}\n"
            
        # Add education if available
        if profile_data.get("education"):
            profile_context += f"- Education: {profile_data['education']}\n"
            
        # Add experience if available
        if profile_data.get("experience"):
            profile_context += f"- Experience: {profile_data['experience']}\n"
            
        # Add work preferences if available
        if profile_data.get("workpreference"):
            profile_context += f"- Work preference: {profile_data['workpreference']}\n"
            
        # Add accommodations if available
        if profile_data.get("accommodations"):
            profile_context += f"- Accommodations needed: {profile_data['accommodations']}\n"
            
        # Add job type preference if available
        if profile_data.get("jobtype"):
            profile_context += f"- Preferred job type: {profile_data['jobtype']}\n"
            
        # Add certifications if available
        if profile_data.get("certifications"):
            profile_context += f"- Certifications: {profile_data['certifications']}\n"
    
    # Build the full prompt
    prompt = f"""
    {system_prompt}
    
    {profile_context}
    
    {conversation_context}
    
    User: {chat_request.message}
    
    Assistant:
    """
    
    # Call Gemini for a response
    response = await call_gemini(prompt)
    
    # Handle different response types
    if isinstance(response, dict) and "error" in response:
        return {"response": f"I apologize, but I encountered an error: {response['error']}"}
    elif isinstance(response, str):
        return {"response": response}
    else:
        return {"response": str(response)}

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)