import express from "express";
import {
    getTeamRequest,
    createTeamRequest,
    updateTeamRequest,
    deleteTeamRequest
} from "../controllers/team.controller.js";
import { upload } from "../middleware/team.middleware.js";

const router = express.Router();

// GET → Fetch all team members
router.get("/getData", getTeamRequest);

// POST → Add new team member
router.post("/create", upload.single("img"), createTeamRequest);

// PUT → Update existing team member (by ID)
router.put("/update/:id", upload.single("img"), updateTeamRequest);

// DELETE → Remove team member (by ID)
router.delete("/delete/:id", deleteTeamRequest);

export default router;