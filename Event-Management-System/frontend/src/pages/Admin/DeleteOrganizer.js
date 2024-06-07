import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ROUTE } from "../../env";
import { toast } from "react-toastify";
import classes from "./AdminActions.module.css";
import HomeAdminSide from "../../utils/HomeAdminSide";

export default function DeleteOrganizer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/user/profile`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      const attendees = response.data.filter(
        (user) => user.role === "organizer"
      );
      setUsers(attendees);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_ROUTE}/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      });
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  return (
    <HomeAdminSide>
      <div className={classes.container}>
        <h1>Delete User</h1>
        <ul className={classes.userList}>
          {users.map((user) => (
            <li key={user._id} className={classes.userItem}>
              <p>
                {user.firstName} {user.lastName} ({user.email})
              </p>
              <button
                onClick={() => handleDelete(user._id)}
                className={classes.deleteButton}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </HomeAdminSide>
  );
}
