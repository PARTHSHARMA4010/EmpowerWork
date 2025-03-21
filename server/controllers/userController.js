import supabase from "../config/supabase.js";
import { readFile } from "fs/promises";
import axios from 'axios'
const allCourses = JSON.parse(
    await readFile(new URL("../assets/coursesDetails.json", import.meta.url))
  );

// Get user profile by ID
export const getData = async (req, res) => {
    try {
        const { email } = req.params;
        const { data, error } = await supabase.from("profiles").select("*").eq("email", email).single();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};

export const getCourses = async (req,res)=>{
    try {
        const { email } = req.body;
        console.log(email)
        const { data, error } = await supabase.from("profiles").select("skills").eq
        ("email", email).single();
        if (error) throw error
        // will use by shreyank later
        const response = await axios.post(`https://shreyankisiri-courserecommendation.hf.space/search?query=${data.skills}`);
        const courses = response.data
        const filteredCourses = allCourses.filter(course => courses.includes(course.course_id));
        res.status(200).json({ skills: data.skills, recommendedCourses: filteredCourses });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

