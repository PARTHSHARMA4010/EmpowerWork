import express from "express";
import { createOpeningPost, getOpeningPost,getOpenings } from "../controllers/openingController.js";

const router = express.Router();

router.post("/create", createOpeningPost);
router.get("/:id", getOpeningPost);
router.get("/",getOpenings)

export default router;
