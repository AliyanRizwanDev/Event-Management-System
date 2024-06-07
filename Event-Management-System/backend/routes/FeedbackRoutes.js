import express from "express";
import {
  getFeedbackByEventId,
  addFeedback,
} from "../controller/FeedbackController.js";

const router = express.Router();

router.get("/:eventId", getFeedbackByEventId);
router.post("/", addFeedback);

export default router;
