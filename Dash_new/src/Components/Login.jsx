import "../Styles/Login.css";
import React, { useState, useEffect, useCallback } from "react";
import loginSVG from "../assets/logging.svg";
import devSVG from "../assets/developer.svg";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";

// BackEnd API URL:
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const PanelContent = ({ handleDemoClick }) => (
  <div className="content">
    <h3>Just here to explore ?</h3>
    <p>
      View our demo dataset analysis and insights. Browse through our
      visualizations. See intuitive AI-powered storyboards. Play.
      Discover.
    </p>
    <button className="btn transparent" onClick={handleDemoClick}>
      Demo
    </button>
  </div>
);

function Login() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const navigate = useNavigate();

  const handleDemoClick = useCallback(() => {
    navigate("/homeDemo");
  }, [navigate]);

  const handleSignUpClick = useCallback(() => {
    setIsSignUpMode(true);
    setShowForm(false);
  }, []);

  const handleSignInClick = useCallback(() => {
    setIsSignUpMode(false);
    setShowForm(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isSignUpMode]);

  return (
    <>
      <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
        <div className="panels-container">
          <div className={`panel left-panel ${isSignUpMode ? "sign-up-mode" : ""}`}>
            <PanelContent handleDemoClick={handleDemoClick} />
            <img src={loginSVG} className="image" alt="" />
          </div>
          <div className={`panel right-panel ${isSignUpMode ? "sign-up-mode" : ""}`}>
            <PanelContent handleDemoClick={handleDemoClick} />
            <img src={devSVG} className="image" alt="" />
          </div>
        </div>

        <div className="forms-container">
          <div className="signin-signup">
            {showForm && (
              isSignUpMode ? (
                <>
                  <SignUpForm showForm={showForm} />
                  <div className="sign-in-request">
                    <span>
                      One of us ?{" "}
                      <p onClick={handleSignInClick}>
                        Sign in
                      </p>
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <SignInForm showForm={showForm} />
                  <div className="sign-up-request">
                    <span>
                      New here ?{" "}
                      <p onClick={handleSignUpClick}>
                        Sign up
                      </p>
                    </span>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
