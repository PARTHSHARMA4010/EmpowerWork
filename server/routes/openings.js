import express from "express";
import { createOpeningPost, getOpeningPost } from "../controllers/openingController.js";

const router = express.Router();

router.post("/create", createOpeningPost);
router.get("/:id", getOpeningPost);

export default router;
