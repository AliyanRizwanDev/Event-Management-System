import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../../env";
import { toast } from "react-toastify";
import HomeOrgSide from "../../utils/HomeOrgSide";
import classes from "./Notifications.module.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [newNotification, setNewNotification] = useState("");
  const data = localStorage.getItem("user");

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_ROUTE}/user/notifications/${JSON.parse(data)._id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(data).token}`,
          },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const cancelNotification = async (id) => {
    try {
      await axios.delete(`${API_ROUTE}/user/notifications/cancel/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(data).token}`,
        },
      });
      setRefresh(!refresh);
      console.log("Notification Deleted successfully");
      toast.success("Notification Deleted successfully");
    } catch (error) {
      console.error("Error Deleting notification:", error);
      toast.error("Error Deleting notification");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_ROUTE}/user/notifications`,
        {
          userId: JSON.parse(data)._id,
          message: newNotification,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(data).token}`,
          },
        }
      );
      setNewNotification("");
      toast.success("Notification created successfully");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error creating notification:", error);
      toast.error("Error creating notification");
    }
  };

  return (
    <HomeOrgSide>
      <div className={classes.container}>
        <h1 className={classes.title}>Notifications</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label htmlFor="newNotification" className={classes.label}>
            New Notification:
          </label>
          <input
            type="text"
            id="newNotification"
            value={newNotification}
            onChange={(e) => setNewNotification(e.target.value)}
            className={classes.input}
            required
          />
          <button type="submit" className={classes.button}>
            Create Notification
          </button>
        </form>
        {notifications.length === 0 ? (
          <p className={classes.message}>No notifications found</p>
        ) : (
          <ul className={classes.notificationList}>
            {notifications.map((notification) => (
              <li key={notification._id} className={classes.notificationItem}>
                <p className={classes.notificationMessage}>
                  {notification.message}
                </p>
                <button
                  onClick={() => cancelNotification(notification._id)}
                  className={classes.cancelButton}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </HomeOrgSide>
  );
}
