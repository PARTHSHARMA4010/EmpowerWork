import supabase from "../config/supabase.js";

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
        const { data, error } = await supabase.from("profiles").select("skills,").eq
        ("email", email).single();
        if (error) throw error
        // will use by shreyank later
        
        res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

