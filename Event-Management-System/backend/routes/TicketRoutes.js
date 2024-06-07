import express from "express";
import {
  getAllTickets,
  createTicket,
  getTicketById,
  cancelTicket,
} from "../controller/TicketController.js";

const router = express.Router();

router.get("/", getAllTickets);
router.post("/", createTicket);
router.get("/:id", getTicketById);
router.get("/:id/cancel", cancelTicket);

export default router;
