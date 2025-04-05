// server/controllers/userController.js
import { db } from "../config/firebase.js";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { readFile } from "fs/promises";
import axios from 'axios';

const allCourses = JSON.parse(
  await readFile(new URL("../assets/coursesDetails.json", import.meta.url))
);

// Get user profile by email
export const getData = async (req, res) => {
  try {
    const { email } = req.params;
    const usersRef = collection(db, "profiles");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }
    
    // Get the first document that matches
    const docData = querySnapshot.docs[0].data();
    const userData = { id: querySnapshot.docs[0].id, ...docData };
    
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get recommended courses based on user skills
export const getCourses = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const usersRef = collection(db, "profiles");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const userData = querySnapshot.docs[0].data();

    // Fetch recommended courses
    const response = await axios.post(
      `https://shreyankisiri-courserecommendation.hf.space/search?query=${userData.skills}`
    );
    const courses = response.data;

    // Filter courses based on the recommended list
    const filteredCourses = allCourses.filter(course => courses.includes(course.course_id));

    // Remove duplicate instructors
    const uniqueCourses = [];
    const instructorSet = new Set();

    for (const course of filteredCourses) {
      if (!instructorSet.has(course.course_name)) {
        instructorSet.add(course.course_name);
        uniqueCourses.push(course);
      }
    }

    res.status(200).json({ skills: userData.skills, recommendedCourses: uniqueCourses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};