import Event from "../models/EventModel.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, time, venue, ticketTypes, organizer } =
      req.body;

    const updatedTicketTypes = ticketTypes.map((ticket) => ({
      type: ticket.type,
      price: ticket.price,
      availability: ticket.availability,
      quantity: ticket.quantity,
    }));

    const newEvent = await Event.create({
      title,
      description,
      date,
      time,
      venue,
      ticketTypes: updatedTicketTypes,
      organizer,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markEventAsAttended = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.body.attendee;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.attendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You is already attending this event" });
    }

    event.attendees.push(userId);
    await event.save();

    return res.status(200).json({ message: "Event marked as attended", event });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
