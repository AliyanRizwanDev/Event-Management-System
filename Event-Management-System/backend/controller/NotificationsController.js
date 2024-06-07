import Notification from "../models/NotificationsModel.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getNotificationById = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.id });
    if (!notifications) {
      return res.status(404).json({ message: "Notifications not found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
