import React, { useState } from "react";
import classes from "./Signup.module.css";
import Logo from "../assets/logo.png";
import Loader from "../utils/Loader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_ROUTE } from "../env";

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("attendee");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.toLowerCase());
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        password
      );
    const isConfirmPasswordValid =
      isPasswordValid && password === confirmPassword;

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);
    setConfirmPasswordError(!isConfirmPasswordValid);

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      const data = {
        firstName: firstname,
        lastName: lastname,
        email,
        password,
        role,
      };

      try {
        await axios.post(`${API_ROUTE}/user/signup`, data);
        setApiError("");
        setLoader(false);
        toast("Account Created");
        nav(`/`);
      } catch (error) {
        console.log(error.response.data.error);
        setApiError(error.response.data.error);
        setLoader(false);
      }
    } else {
      setLoader(false);
    }
  };

  return (
    <div className={classes.loginPage}>
      <div className={classes.leftDesign}>
        <img src={Logo} alt="" className={classes.loginImg} />
        <h4>Bridging Moments, Building Memories.</h4>
      </div>
      <div className={classes.Login}>
        <form className={classes.LoginForm} onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && (
            <p className={classes.errorMessage}>Email is not valid</p>
          )}
          <label htmlFor="password">Password (must be strong)</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && (
            <p className={classes.errorMessage}>
              Password must be at least 8 characters long and contain at least
              one lowercase letter, one uppercase letter, one digit, and one
              special character
            </p>
          )}
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {confirmPasswordError && (
            <p className={classes.errorMessage}>Passwords do not match</p>
          )}
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
            <option value="admin">Admin</option>
          </select>
          {apiError === "" ? (
            ""
          ) : (
            <p className={classes.errorMessage}>{apiError}</p>
          )}
          <button type="submit">{loader ? <Loader /> : "Sign Up"}</button>
          <p>
            Already have an account?
            <Link to={"/"}>
              <span>Log In</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
