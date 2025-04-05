import asyncio
import httpx
import json
import base64
import os
from pprint import pprint

# Configuration
BASE_URL = "http://localhost:8000"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", 'Key here')

# Sample test data - base64 encoded resume
sample_resume_text = """
John Doe
johndoe@example.com
(123) 456-7890
New York, NY

SUMMARY
Experienced software developer with 5 years of experience in Python and JavaScript development. 
Mobility impairment requiring flexible work arrangements.

SKILLS
Python, JavaScript, React, Node.js, TensorFlow, SQL, Git, Agile, REST APIs

EXPERIENCE
Senior Software Engineer, TechCorp
June 2020 - Present
- Developed and maintained Python microservices architecture
- Led team of 3 developers for client projects
- Implemented CI/CD pipelines using Jenkins and Docker

Software Developer, WebSolutions Inc
July 2018 - June 2020
- Built and maintained React-based web applications
- Implemented REST APIs using Node.js and Express
- Optimized database queries resulting in 40% performance improvement

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2014-2018
GPA: 3.8/4.0

CERTIFICATIONS
AWS Certified Developer - Associate, 2022
TensorFlow Developer Certificate, 2021
"""

sample_resume_base64 = base64.b64encode(sample_resume_text.encode()).decode("utf-8")

# Sample job data
sample_job = {
    "title": "Senior Python Developer",
    "company": "InnovateTech",
    "location": "New York, NY",
    "salary": "$120,000 - $150,000",
    "description_text": """
    We are looking for a Senior Python Developer to join our growing team. The ideal candidate will have 
    3+ years of experience with Python and related frameworks, strong problem-solving skills, and be 
    comfortable working in a fast-paced environment.
    
    Requirements:
    - 3+ years of experience with Python
    - Experience with web frameworks like Flask or Django
    - Strong understanding of RESTful APIs
    - Experience with SQL and NoSQL databases
    - Excellent problem-solving and communication skills
    
    Nice to have:
    - Experience with cloud platforms (AWS, GCP)
    - Knowledge of Docker and Kubernetes
    - Experience with machine learning libraries
    
    We offer flexible working arrangements and are committed to accessibility and inclusion.
    """,
    "isRemote": True,
    "category": "Software Development",
    "accessibilityFeatures": ["Flexible Hours", "Remote Work Options", "Ergonomic Equipment Provided"],
    "required_skills": [
        {"name": "Python", "importance": 1.0},
        {"name": "Flask", "importance": 0.8},
        {"name": "SQL", "importance": 0.8}
    ],
    "preferred_skills": [
        {"name": "AWS", "importance": 0.5},
        {"name": "Docker", "importance": 0.5},
        {"name": "TensorFlow", "importance": 0.3}
    ],
    "responsibilities": [
        "Design and implement scalable Python applications",
        "Collaborate with team members to architect solutions",
        "Write clean, maintainable, and efficient code",
        "Participate in code reviews and mentoring junior developers"
    ],
    "qualifications": [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience with Python development",
        "Strong problem-solving skills",
        "Excellent communication skills"
    ]
}

# Sample profile data
sample_profile = {
    "email": "johndoe@example.com",
    "userType": "job-seeker",
    "name": "John Doe",
    "disabilityType": "Mobility impairment",
    "education": "Bachelor of Science in Computer Science, University of Technology, 2014-2018",
    "experience": "5 years of software development experience in Python and JavaScript",
    "skills": "Python, JavaScript, React, Node.js, TensorFlow, SQL, Git, Agile, REST APIs",
    "certifications": "AWS Certified Developer, TensorFlow Developer Certificate",
    "jobtype": "Full-time",
    "workpreference": "Remote",
    "accommodations": "Flexible hours, ergonomic workspace"
}

# Sample course recommendation request
sample_course_request = {
    "skills": ["Python", "JavaScript", "React"],
    "desired_job": "Senior Developer",
    "missing_skills": ["Docker", "Kubernetes", "AWS"],
    "limit": 3
}

# Resume data structure for job matching
resume_data = {
    "full_text": sample_resume_text,
    "parsed_sections": {
        "summary": "Experienced software developer with 5 years of experience in Python and JavaScript development.",
        "contact": {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "phone": "(123) 456-7890",
            "location": "New York, NY"
        }
    },
    "skills": [
        {"name": "Python", "proficiency": "Expert"},
        {"name": "JavaScript", "proficiency": "Expert"},
        {"name": "React", "proficiency": "Intermediate"},
        {"name": "Node.js", "proficiency": "Intermediate"},
        {"name": "SQL", "proficiency": "Intermediate"}
    ],
    "experience": [
        {
            "role": "Senior Software Engineer",
            "company": "TechCorp",
            "start_date": "2020-06",
            "end_date": "Present",
            "description": "Developed and maintained Python microservices architecture",
            "achievements": [
                "Led team of 3 developers for client projects",
                "Implemented CI/CD pipelines using Jenkins and Docker"
            ]
        },
        {
            "role": "Software Developer",
            "company": "WebSolutions Inc",
            "start_date": "2018-07",
            "end_date": "2020-06",
            "description": "Built and maintained React-based web applications",
            "achievements": [
                "Implemented REST APIs using Node.js and Express",
                "Optimized database queries resulting in 40% performance improvement"
            ]
        }
    ],
    "education": [
        {
            "institution": "University of Technology",
            "degree": "Bachelor of Science",
            "field_of_study": "Computer Science",
            "start_date": "2014",
            "end_date": "2018",
            "gpa": "3.8/4.0"
        }
    ],
    "certifications": [
        {
            "name": "AWS Certified Developer - Associate",
            "issuer": "Amazon Web Services",
            "date": "2022"
        },
        {
            "name": "TensorFlow Developer Certificate",
            "issuer": "Google",
            "date": "2021"
        }
    ]
}

async def test_resume_parse(client):
    """Test the resume parsing endpoint with base64 encoded resume"""
    print("\n===== TESTING RESUME PARSING =====")
    
    # Test 1: Using base64 encoded content
    print("\nTest Case 1: Resume parsing with base64 encoded content")
    
    try:
        response = await client.post(f"{BASE_URL}/api/resume/parse", data={"file_content": sample_resume_base64})
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Resume parsed successfully")
            print("\nExtracted Profile Data:")
            pprint(result)
            return result
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    # Test 2: Missing required fields
    print("\nTest Case 2: Resume parsing with missing fields")
    try:
        response = await client.post(f"{BASE_URL}/api/resume/parse", json={})
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        if response.status_code != 200:
            print("✅ EXPECTED FAILURE: Server correctly rejected invalid request")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    return None

async def test_job_matching(client):
    """Test the job matching endpoint"""
    print("\n===== TESTING JOB-RESUME MATCHING =====")
    
    # Test 1: Match with detailed resume
    print("\nTest Case 1: Matching with detailed resume and job")
    match_request = {
        "resume": resume_data,
        "job": sample_job
    }
    
    try:
        response = await client.post(f"{BASE_URL}/api/jobs/match", json=match_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Job matching completed successfully")
            print(f"\nMatch Score: {result['match_score']:.1f}%")
            
            print("\nSkills Match:")
            skills_section = result['match_details']['sections']['skills']
            print(f"  Score: {skills_section['score']:.1f}%")
            print(f"  Required Skills Matched: {', '.join(skills_section['required']['matched'])}")
            print(f"  Required Skills Missing: {', '.join(skills_section['required']['missing'])}")
            
            print("\nExperience Match:")
            exp_section = result['match_details']['sections']['experience']
            print(f"  Score: {exp_section['score']:.1f}%")
            print(f"  Matching Aspects: {', '.join(exp_section['matching_aspects'])}")
            
            print("\nTop 3 Improvement Suggestions:")
            for i, suggestion in enumerate(result['feedback']['improvements'][:3]):
                print(f"  {i+1}. {suggestion}")
                
            return result
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    # Test 2: Match with minimal resume (edge case)
    print("\nTest Case 2: Matching with minimal resume data")
    minimal_resume = {
        "full_text": "John Doe, Python Developer",
        "skills": [{"name": "Python"}]
    }
    
    match_request = {
        "resume": minimal_resume,
        "job": sample_job
    }
    
    try:
        response = await client.post(f"{BASE_URL}/api/jobs/match", json=match_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Job matching with minimal data completed")
            print(f"Match Score: {result['match_score']:.1f}%")
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    return None

async def test_course_recommendations(client):
    """Test the course recommendation endpoint"""
    print("\n===== TESTING COURSE RECOMMENDATIONS =====")
    
    # Test 1: Basic recommendation request
    print("\nTest Case 1: Basic course recommendations")
    try:
        response = await client.post(f"{BASE_URL}/api/courses/recommend", json=sample_course_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Course recommendations retrieved successfully")
            
            if len(result) > 0:
                print(f"\nFound {len(result)} recommended courses:")
                for i, course in enumerate(result):
                    print(f"\n{i+1}. {course['course_name']}")
                    print(f"   Relevance Score: {course['relevance_score']:.2f}")
                    print(f"   Matching Skills: {', '.join(course['skill_match'])}")
                    if course['abstract']:
                        print(f"   Abstract: {course['abstract'][:100]}..." if len(course['abstract']) > 100 else course['abstract'])
            else:
                print("No course recommendations found. Make sure courses.json is available.")
            
            return result
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    # Test 2: Recommendation for specific missing skills
    print("\nTest Case 2: Recommendations for specific missing skills")
    specific_request = {
        "skills": ["Python"],
        "missing_skills": ["Docker", "Kubernetes"],
        "limit": 2
    }
    
    try:
        response = await client.post(f"{BASE_URL}/api/courses/recommend", json=specific_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Specific skill recommendations retrieved")
            if len(result) > 0:
                print(f"Found {len(result)} courses for Docker/Kubernetes skills")
            else:
                print("No matching courses found. Make sure courses.json is available.")
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    return None

async def test_chat(client):
    """Test the chat endpoint with and without profile data"""
    print("\n===== TESTING CHAT ENDPOINT =====")
    
    # Test 1: Simple chat without profile
    print("\nTest Case 1: Chat without profile")
    chat_request = {
        "message": "I have a mobility impairment and I'm interested in a career in software development. What accommodations should I ask for?",
        "history": []
    }
    
    try:
        response = await client.post(f"{BASE_URL}/api/chat", json=chat_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Chat response received (without profile)")
            print("\nQuestion: " + chat_request["message"])
            print("\nResponse:")
            print(result['response'][:500] + "..." if len(result['response']) > 500 else result['response'])
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    # Test 2: Chat with profile
    print("\nTest Case 2: Chat with complete profile")
    chat_request = {
        "message": "What specific skills should I focus on developing for my career progression?",
        "profile": sample_profile,
        "history": [
            {
                "role": "user",
                "content": "I'm looking for career advice as a software developer."
            },
            {
                "role": "assistant",
                "content": "I'd be happy to help you with career advice. What specific questions do you have?"
            }
        ]
    }
    
    try:
        response = await client.post(f"{BASE_URL}/api/chat", json=chat_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Chat response received (with profile)")
            print("\nQuestion: " + chat_request["message"])
            print("\nResponse:")
            print(result['response'][:500] + "..." if len(result['response']) > 500 else result['response'])
            return result
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    # Test 3: Chat with partial profile (edge case)
    print("\nTest Case 3: Chat with partial profile")
    partial_profile = {
        "email": "johndoe@example.com",
        "userType": "job-seeker",
        "disabilityType": "Mobility impairment"
    }
    
    chat_request = {
        "message": "What career paths would be suitable for me?",
        "profile": partial_profile
    }
    
    try:
        response = await client.post(f"{BASE_URL}/api/chat", json=chat_request)
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS: Chat response received (with partial profile)")
            print("\nResponse preview: " + result['response'][:100] + "...")
        else:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
    
    return None

async def run_all_tests():
    """Run all test cases with appropriate delays between tests"""
    print("🚀 STARTING API TESTS")
    print(f"Base URL: {BASE_URL}")
    print(f"Gemini API Key: {'Configured' if GEMINI_API_KEY != 'your-api-key-here' else '⚠️ NOT CONFIGURED'}")
    
    if GEMINI_API_KEY == 'your-api-key-here':
        print("\n⚠️ WARNING: Gemini API key not set. Tests will likely fail.")
        print("Set the GEMINI_API_KEY environment variable before running tests.")
    
    # Create a client with a reasonable timeout
    async with httpx.AsyncClient(timeout=60.0) as client:
        # Test resume parsing
        await test_resume_parse(client)
        await asyncio.sleep(1)  # Avoid rate limiting
        
        # Test job matching
        await test_job_matching(client)
        await asyncio.sleep(1)
        
        # Test course recommendations
        await test_course_recommendations(client)
        await asyncio.sleep(1)
        
        # Test chat
        await test_chat(client)
    
    print("\n✅ ALL TESTS COMPLETED")

if __name__ == "__main__":
    # Run the test suite
    asyncio.run(run_all_tests())