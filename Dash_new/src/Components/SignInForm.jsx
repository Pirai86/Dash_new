import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import React, { useState, useContext } from "react";
import usePasswordToggle from "../hooks/usePasswordToggle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "./Global";
import { BACKEND_API_URL } from "./Login";

export function SignInForm({ showForm }) {
  const { setjwt } = useContext(GlobalContext);
  const { setuserfullName, settotalProjects, setisGotoExperimentClicked } = useContext(GlobalContext);
  const { appendToprojectsName, appendToprojectsID, appendToprojectsDesc, appendToCreatedON, appendToLastModifiedON, appendToprojectsIsDemo } = useContext(GlobalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [PasswordInputType, ToggleIcon] = usePasswordToggle();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(BACKEND_API_URL + "auth/login", {
        username: email,
        password: password,
      })
      .then((result) => {
        if (result.status === 200) {
          setisGotoExperimentClicked(false);
          const token = result.data.access_token;
          setjwt(token);
          console.log("JWT : ", result.data.access_token);
          localStorage.setItem('token', token);
          setErrorMessage(""); // Clear error message

          // Fetch user profile and projects
          const fetchProfile = async () => {
            try {
              const profileResponse = await axios.get(BACKEND_API_URL + "auth/myprofile", {
                headers: { Authorization: `Bearer ${token}` },
              });
              setuserfullName(profileResponse.data.full_name);

              const projectsResponse = await axios.get(BACKEND_API_URL + "dashboard/projects", {
                headers: { Authorization: `Bearer ${token}` },
              });
              settotalProjects(projectsResponse.data.n_projects);

              projectsResponse.data.projects.forEach((project) => {
                appendToprojectsName(project.project_name);
                appendToprojectsID(project.project_id);
                appendToprojectsDesc(project.project_notes);
                appendToCreatedON(project.created_on);
                appendToLastModifiedON(project.last_modified);
                appendToprojectsIsDemo(project.is_demo);
              });

              navigate("/home");
            } catch (err) {
              console.error("Error fetching profile or projects:", err);
              setErrorMessage("Failed to load user data. Please try again.");
            }
          };

          fetchProfile();
        } else {
          setErrorMessage("Invalid User Credentials");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        setErrorMessage("An error occurred during login. Please try again.");
      });
  };

  if (!showForm) {
    return null;
  }

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <div className="icons">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-field">
        <div className="icons">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <input
          type={PasswordInputType}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="password-toggle-icon">{ToggleIcon}</span>
      </div>

      {errorMessage && (
        <p className="error-text" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}

      <div className="checkbox">
        <input
          className="checkbox-input"
          type="checkbox"
          id="remember-me"
          name="remember-me"
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <div className="forgot-password-container">
        <a href="#">Forgot Password?</a>
      </div>
      <input type="submit" value="Login" className="btn solid" />
      <p className="social-text">Or Sign in with social platforms</p>
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
