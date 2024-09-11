import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import usePasswordToggle from "../hooks/usePasswordToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PasswordChecklist from "react-password-checklist";
import { BACKEND_API_URL } from "./Login";

export function SignUpForm({ showForm }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [PasswordInputType, ToggleIcon] = usePasswordToggle();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorPasswordValMessage, setPasswordValMessage] = useState("");
  const [userExists, setUserExists] = useState(false);

  const [passwordChecklist, setPasswordChecklist] = useState(null);

  const navigate = useNavigate();

  function handleSetPassword(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Calculate the checklist result
    const result = {
      minLength: newPassword.length >= 8,
      capital: /[A-Z]/.test(newPassword), // Check for at least one uppercase letter
      specialChar: /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(newPassword), // Check for special characters
      number: /[0-9]/.test(newPassword), // Check for at least one digit
      // notWeak: !/(password|123|admin)/i.test(newPassword),
    };

    setPasswordChecklist(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if password and matchPassword match
    if (password !== passwordMatch) {
      setPasswordMatch(false);
      setErrorMessage("Passwords do not match");
      return; // Prevent form submission
    } else {
      setPasswordMatch(true); // Reset password match status
      setErrorMessage(""); // Clear error message
    }

    // Check if all Password Checklist rules are satisfied
    if (!Object.values(passwordChecklist).every((rule) => rule === true)) {
      setPasswordValMessage(
        "Please make sure the entered password follows all the displayed rules"
      );
      return; // Prevent form submission
    } else {
      setPasswordValMessage("");
    }

    axios
      .get(BACKEND_API_URL + "check-email?email=" + email)
      .then((result) => {
        if (result.data.exists) {
          setUserExists(true);
          setErrorMessage("User already exists!");
        } else {
          setUserExists(false);
          setErrorMessage(""); // Clear error message

          // Proceed with registration
          axios
            .post(BACKEND_API_URL + "register", { name, email, password })
            .then((result) => {
              navigate("/home");
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  if (!showForm) {
    return null;
  }

  return (
    <form action="" className="sign-up-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <div className="icons">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          required />
      </div>

      <div className="input-field">
        <div className="icons">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required />
      </div>

      {userExists && (
        <p className="error-text" style={{ color: "red" }}>
          User already exists
        </p>
      )}

      <div className="input-field">
        <div className="icons">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <input
          type={PasswordInputType}
          placeholder="Password"
          value={password}
          onChange={handleSetPassword}
          required />
        <span className="password-toggle-icon">{ToggleIcon}</span>
      </div>

      {passwordChecklist && (
        <PasswordChecklist
          rules={["capital", "specialChar", "minLength", "number"]}
          minLength={8}
          value={password}
          showFeedback={true} />
      )}

      <div className="input-field">
        <div className="icons">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <input
          type={PasswordInputType}
          placeholder="Confirm Password"
          onChange={(e) => setPasswordMatch(e.target.value)}
          required />
        <span className="password-toggle-icon">{ToggleIcon}</span>
      </div>

      {!passwordMatch && (
        <p className="error-text" style={{ color: "red" }}>
          Password does not match
        </p>
      )}

      {errorPasswordValMessage && ( // Display error message if it is set
        <p className="error-text" style={{ color: "red" }}>
          {errorPasswordValMessage}
        </p>
      )}

      <input type="submit" className="btn" value="Sign up" />
      <p className="social-text">Or Sign up with social platforms</p>

      <div className="social-media">
        <a href="#" className="social-icon">
          <FontAwesomeIcon icon={faGoogle} />
        </a>
        <a href="#" className="social-icon">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </form>
  );
}
