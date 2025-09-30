import express from "express";
import { updateFooterRequest, getFooterRequest } from "../controllers/footer.controller.js";

const router = express.Router();

router.post("/request", updateFooterRequest);
router.get("/getData", getFooterRequest);

export default router;