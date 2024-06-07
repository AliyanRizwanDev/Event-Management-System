import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  markEventAsAttended,
} from "../controller/EventController.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/:id", markEventAsAttended);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
