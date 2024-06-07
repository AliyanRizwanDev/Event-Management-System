import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  attendee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketType: { type: String, required: true },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
});

const ticket = mongoose.model("Ticket", TicketSchema);
export default ticket;
