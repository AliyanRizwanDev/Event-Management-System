import Feedback from "../models/FeedbackModel.js";

export const getFeedbackByEventId = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const feedback = await Feedback.find({ event: eventId }).populate(
      "attendee",
      "name email"
    );
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
