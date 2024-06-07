import Ticket from "../models/TicketModel.js";

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTicket = async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const attendeeId = req.params.id;
    const ticket = await Ticket.findOne({ attendee: attendeeId });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.status = "canceled";
    await ticket.save();
    res.status(200).json({ message: "Ticket canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
