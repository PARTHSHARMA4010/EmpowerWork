// src/lib/career/CareerAPIClient.ts
export class CareerAPIClient {
    baseUrl: string;
  
    constructor(baseUrl: string) {
      this.baseUrl = baseUrl;
    }
  
    async parseResume(input: any) {
      const response = await fetch(`${this.baseUrl}/resume/parse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {   
        const error = await response.json();
        throw new Error(error.message || "Resume parsing failed");
      }
  
      return response.json();
    }
  
    async matchJobWithResume(input: any) {
      const response = await fetch(`${this.baseUrl}/job/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Job matching failed");
      }
  
      return response.json();
    }
  
    async getRecommendedCourses(input: any) {
      const response = await fetch(`${this.baseUrl}/courses/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Course recommendation failed");
      }
  
      return response.json();
    }
  
    async chat(input: any) {
      const response = await fetch(`${this.baseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Chat failed");
      }
  
      return response.json();
    }
  }
  