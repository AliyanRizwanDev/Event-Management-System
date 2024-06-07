import React, { useState } from "react";
import HomeOrgSide from "../../utils/HomeOrgSide";
import classes from "./CreateEvent.module.css";
import axios from "axios";
import { API_ROUTE } from "../../env";
import { toast } from "react-toastify";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [ticketTypes, setTicketTypes] = useState([
    { type: "", price: "", quantity: "" },
  ]);
  const data = localStorage.getItem("user");

  const handleTicketChange = (index, field, value) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index][field] = value;
    setTicketTypes(newTicketTypes);
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { type: "", price: "", quantity: "" }]);
  };

  const handleTicketRemove = (index) => {
    const newTicketTypes = [...ticketTypes];
    newTicketTypes.splice(index, 1);
    setTicketTypes(newTicketTypes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !venue ||
      !ticketTypes.every(
        (ticket) => ticket.type && ticket.price && ticket.quantity
      )
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const eventDate = {
      title,
      description,
      date,
      time,
      venue,
      ticketTypes,
      organizer: JSON.parse(data)._id,
    };

    try {
      const response = await axios.post(
        `${API_ROUTE}/user/events/`,
        eventDate,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(data).token}`,
          },
        }
      );
      console.log("Event created successfully:", response.data);
      toast.success("Event created successfully");
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
    }
  };

  return (
    <HomeOrgSide>
      <div className={classes.container}>
        <h1>Create New Event</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.formGroup}>
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="date">Event Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="time">Event Time</label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="venue">Event Venue</label>
            <input
              type="text"
              id="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              required
            />
          </div>
          <div className={classes.ticketSection}>
            <h2>Ticket Types</h2>
            {ticketTypes.map((ticket, index) => (
              <div key={index} className={classes.ticketGroup}>
                <div className={classes.formGroup}>
                  <label htmlFor={`type-${index}`}>Type</label>
                  <input
                    type="text"
                    id={`type-${index}`}
                    value={ticket.type}
                    onChange={(e) =>
                      handleTicketChange(index, "type", e.target.value)
                    }
                    required
                  />
                </div>
                <div className={classes.formGroup}>
                  <label htmlFor={`price-${index}`}>Price</label>
                  <input
                    type="number"
                    id={`price-${index}`}
                    value={ticket.price}
                    onChange={(e) =>
                      handleTicketChange(index, "price", e.target.value)
                    }
                    required
                  />
                </div>

                <div className={classes.formGroup}>
                  <label htmlFor={`quantity-${index}`}>Quantity</label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    value={ticket.quantity}
                    onChange={(e) =>
                      handleTicketChange(index, "quantity", e.target.value)
                    }
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleTicketRemove(index)}
                  className={classes.addButton}
                >
                  Cancel
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTicketType}
              className={classes.addButton}
            >
              Add Ticket Type
            </button>
          </div>
          <button type="submit" className={classes.submitButton}>
            Create Event
          </button>
        </form>
      </div>
    </HomeOrgSide>
  );
}
