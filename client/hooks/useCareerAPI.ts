// src/hooks/useCareerAPI.ts
import { CareerAPIClient } from "@/lib/career/CareerAPIClient";

const client = new CareerAPIClient(process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000");

export const useCareerAPI = () => {
  return {
    parseResume: client.parseResume.bind(client),
    matchJobWithResume: client.matchJobWithResume.bind(client),
    getRecommendedCourses: client.getRecommendedCourses.bind(client),
    chat: client.chat.bind(client),
  };
};
