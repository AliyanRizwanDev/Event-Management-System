import React, { useEffect, useState } from "react";
import classes from "./Profile.module.css";
import HomeAdminSide from "../../utils/HomeAdminSide";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE } from "../../env";

const Profile = () => {
  const data = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_ROUTE}/user/profile/${data._id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        const { firstName, lastName, email, phone } = response.data.userProfile;
        setProfile((prevProfile) => ({
          ...prevProfile,
          firstname: firstName,
          lastname: lastName,
          email: email,
          phone: phone,
        }));
      })
      .catch((error) => {
        setError("Error fetching profile data.");
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSave = async () => {
    await axios
      .put(
        `${API_ROUTE}/user/profile/${data._id}`,
        {
          firstName: profile.firstname,
          lastName: profile.lastname,
          email: profile.email,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        toast("Profile Updated");
      })
      .catch((error) => {
        console.log(error.response.data.error);
      });
  };

  const handlePassword = async () => {
    if (profile.newPassword !== profile.confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }

    await axios
      .put(
        `${API_ROUTE}/user/profile/password/${data._id}`,
        {
          password: profile.password,
          newPassword: profile.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        toast("Profile Updated");
        setPasswordError("");
      })
      .catch((error) => {
        setPasswordError("Error updating password.");
        console.log(error);
      });
  };

  return (
    <HomeAdminSide>
      <div className={classes.myProfile}>
        <h1>My Profile</h1>

        <div className={classes.profileSection}>
          <h2>Profile Information</h2>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              className={classes.inputField}
              value={profile.firstname}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              className={classes.inputField}
              value={profile.lastname}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              className={classes.inputField}
              value={profile.email}
              onChange={handleChange}
            />
          </label>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <button className={classes.saveButton} onClick={handleSave}>
          Save Changes
        </button>
        <div className={classes.profileSection}>
          <h2>Account Settings</h2>
          <label>
            Current Password:
            <input
              type="password"
              name="password"
              className={classes.inputField}
              onChange={handleChange}
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              name="newPassword"
              className={classes.inputField}
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm New Password:
            <input
              type="password"
              name="confirmPassword"
              className={classes.inputField}
              onChange={handleChange}
            />
          </label>
          {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
        </div>

        <button className={classes.saveButton} onClick={handlePassword}>
          Change Password
        </button>
      </div>
    </HomeAdminSide>
  );
};

export default Profile;
