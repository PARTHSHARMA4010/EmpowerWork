import express from "express";
import { getData} from "../controllers/userController.js";

const router = express.Router();

// router.post("/create", createUserProfile);
router.get("/:id", getData);
// router.post("/follow", followUser);

export default router;
