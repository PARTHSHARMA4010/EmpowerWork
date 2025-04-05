import express from "express";
import { getData, getCourses } from "../controllers/userController.js";

const router = express.Router();

router.get("/:email", getData);
router.post("/getCourses", getCourses);


export default router;