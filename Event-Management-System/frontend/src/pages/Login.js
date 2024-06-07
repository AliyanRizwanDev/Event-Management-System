import React, { useState } from "react";
import classes from "./Login.module.css";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userActions } from "../redux/store";
import { API_ROUTE } from "../env";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [apiError, setApiError] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.toLowerCase());
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(
        password
      );

    setEmailError(!isEmailValid);
    setPasswordError(!isPasswordValid);

    if (isEmailValid && isPasswordValid) {
      const data = {
        email,
        password,
      };

      try {
        const response = await axios.post(`${API_ROUTE}/user/login`, data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setApiError("");
        setLoader(false);
        dispatch(userActions.LoggedIn(response.data));
        toast.success(`Welcome ${response.data.user.firstName}!!!`);
        nav(`/${response.data.user.role}`);
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
          <h1>Log In</h1>
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && (
            <p className={classes.errorMessage}>E-Mail not correct</p>
          )}
          <label htmlFor="password">Password</label>
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

          <button type="submit">{loader ? <Loader /> : "Log In"}</button>
          {apiError === "" ? (
            ""
          ) : (
            <p className={classes.errorMessage}>{apiError}</p>
          )}
          <p>
            Don’t have an account?
            <Link to={"/sign-up"}>
              <span>Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
