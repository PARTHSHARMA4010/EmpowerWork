import supabase from "../config/supabase.js";

// Create a new job opening
export const createOpeningPost = async (req, res) => {
    try {
        const { company_name, industry, open_positions, jobType, remote_policy } = req.body;
        const { data, error } = await supabase.from("profiles").insert([{ 
            company_name, industry, open_positions, jobType, remote_policy 
        }]);
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
};

// Get a specific job opening by ID
export const getOpeningPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getOpenings = async (req, res) => {
    try {
        const { data, error } = await supabase.from("jobs").select("*");
        if (error) throw error;
        res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
            }
}
