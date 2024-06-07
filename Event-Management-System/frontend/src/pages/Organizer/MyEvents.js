import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { API_ROUTE } from "../../env";
import classes from "./MyEventsOrg.module.css";
import HomeOrgSide from "../../utils/HomeOrgSide";
import EditEventModal from "./EditEventModal";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "600px",
    border: "2px solid black",
    boxShadow: "5px 5px 20px",
  },
};

export default function MyEventsOrg() {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = localStorage.getItem("user");
      const response = await axios.get(`${API_ROUTE}/user/events`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(data).token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const cancelEvent = async (eventId) => {
    try {
      const data = localStorage.getItem("user");
      await axios.delete(`${API_ROUTE}/user/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(data).token}`,
        },
      });
      setEvents(events.filter((event) => event._id !== eventId));
      console.log("Event canceled successfully");
    } catch (error) {
      console.error("Error canceling event:", error);
    }
  };

  const editEvent = (eventId) => {
    setEventId(eventId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <HomeOrgSide>
      <div className={classes.myEvents}>
        <h1>My Events</h1>
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          <ul className={classes.eventList}>
            {events.map((event) => (
              <li key={event._id} className={classes.eventItem}>
                <div className={classes.eventInfo}>
                  <h2>{event.title}</h2>
                  <p>{event.description}</p>
                  <p>Date: {event.date.split("T")[0]}</p>
                  <p>Time: {event.time}</p>
                  <p>Venue: {event.venue}</p>
                  <button
                    onClick={() => cancelEvent(event._id)}
                    className={classes.cancelButton}
                  >
                    Delete Event
                  </button>
                  <button
                    onClick={() => editEvent(event._id)}
                    className={classes.editButton}
                  >
                    Edit Event
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Edit Event Modal"
      >
        <EditEventModal eventId={eventId} />
        <button className={classes.editButton} onClick={closeModal}>
          Close
        </button>
      </Modal>
    </HomeOrgSide>
  );
}
