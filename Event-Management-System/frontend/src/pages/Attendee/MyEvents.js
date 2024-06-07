import React, { useEffect, useState } from "react";
import classes from "./MyEvents.module.css";
import Home from "../../utils/Home";
import axios from "axios";
import { API_ROUTE } from "../../env";

const MyEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData._id;

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/user/events/`)
      .then((response) => {
        const filteredEvents = response.data.filter((event) =>
          event.attendees.some((attendee) => attendee === userId)
        );
        setRegisteredEvents(filteredEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  return (
    <Home>
      <div className={classes.myEvents}>
        <h1>My Events</h1>
        <ul className={classes.eventList}>
          {registeredEvents.map((event) => (
            <li
              key={event._id}
              className={`${classes.eventItem} ${classes[event.status]}`}
            >
              <div className={classes.eventDetails}>
                <h2>{event.title}</h2>
                <p>
                  {new Date(event.date).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                    {" "}at { event.time}
                </p>
                <p>Venue: {event.venue}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Home>
  );
};

export default MyEvents;
