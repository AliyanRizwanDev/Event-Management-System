import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./AttendeeDashboard.module.css";
import axios from "axios";
import Home from "../../utils/Home";
import { API_ROUTE } from "../../env";

const AttendeeDashboard = () => {
  const data = JSON.parse(localStorage.getItem("user"));

  const [notification, setNotification] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/user/events`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        setUpcomingEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${API_ROUTE}/user/notifications`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        setNotification(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Home>
      <div className={classes.dashboard}>
        <h1>Dashboard</h1>

        <div className={classes.section}>
          <h2>Upcoming Events</h2>
          <ul className={classes.eventList}>
            {upcomingEvents.slice(0, 5).map((event) => (
              <li key={event.id} className={classes.eventItem}>
                <span>
                  {event.title} - {event.date.split("T")[0]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.section}>
          <h2>Notifications</h2>
          <ul className={classes.notificationList}>
            {notification.slice(0, 5).map((notification) => (
              <li key={notification._id} className={classes.notificationItem}>
                <span>{notification.message}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={classes.section}>
          <h2>Quick Links</h2>
          <div className={classes.quickLinks}>
            <Link to="/attendee/explore-events" className={classes.quickLink}>
              Explore Events
            </Link>
            <Link to="/attendee/profile" className={classes.quickLink}>
              My Profile
            </Link>
          </div>
        </div>
      </div>
    </Home>
  );
};

export default AttendeeDashboard;
