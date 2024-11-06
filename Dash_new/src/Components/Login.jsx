import "../Styles/Login.css";
import React, { useState, useContext } from "react";
import { GlobalContext } from "./Global";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import WelcomeImg from "../assets/WelcomeEmoji.png";
import GoogleImg from "../assets/google.png";
import FacebookImg from "../assets/facebook.png";

// BackEnd API URL:
export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

function Login() {

  const { setjwt, setremainingExp, settotalExp } = useContext(GlobalContext);
  const { setuserfullName, settotalProjects, setisGotoExperimentClicked } = useContext(GlobalContext);
  const { appendToprojectsName, appendToprojectsID, appendToprojectsDesc, appendToCreatedON, appendToLastModifiedON, appendToprojectsIsDemo } = useContext(GlobalContext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignInClick = () => {
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
          //console.log("JWT : ", result.data.access_token);
          localStorage.setItem('token', token);
          setErrorMessage(""); // Clear error message

          axios.get(
            BACKEND_API_URL +
            "dashboard/user_expt_quota",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json"
              },
            }
          )
            .then((res) => {
              //console.log("Response Quota : ", res.data.expt_quota);
              settotalExp(res.data.expt_quota);
              //console.log("Response Remaining : ", res.data.expt_remaining);
              setremainingExp(res.data.expt_remaining);
            })


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
              //console.error("Error fetching profile or projects:", err);
              setErrorMessage("Failed to load user data. Please try again.");
            }
          };

          fetchProfile();
        }
      })
      .catch((err) => {
        //console.error("Login error:", err);
        if(err.status === 401)
        {
          setErrorMessage("Invalid User Credentials");
        }
        
      });
  }


  return (
    <div className="Login-Background">
      <div className="shape1"></div>
      <div className="shape2"></div>
      <div className="Login-Box">
        <div className="Login-Box-Content">
          <div className="Content">
            <div className="Content-Box">
              <div className="Welcome-Box">
                <div className="Text-Box">
                  <p className="text">Welcome Back</p>
                  <img className="WelcomeImg" src={WelcomeImg} alt="" />
                </div>
                <div className="Welcome-Message">
                  <p></p>
                  <p style={{ marginTop: ".5em" }}>Sign in and continue on your projects.</p>
                </div>
              </div>
              <div className="email-password">
                <div className="email">
                  <p>Email</p>
                  <input className="email-input" type="email" placeholder="Example@email.com" onChange={(e) => setemail(e.target.value)} required />
                </div>
                <div className="password">
                  <p>Password</p>
                  <input className="password-input" type="password" placeholder="At least 8 characters" onChange={(e) => setpassword(e.target.value)} required />
                </div>
                <div className="Forgot-Password">
                  <p>Forgot Password?</p>
                </div>
                <div className="Sign-In-Container" onClick={handleSignInClick}>
                  <p>Sign in</p>
                </div>
                <div className="Or-container">
                  <div className="line-OR"></div>
                  <div className="">
                    <p>Or</p>
                  </div>

                  <div className="line-OR"></div>
                </div>
                <div className="Error-Message-Login">
                  <p>{errorMessage}</p>
                </div>
                {/* <div className="Google-SignIn">
                  <img className="GoogleImg" src={GoogleImg} alt="" />
                  <p>Sign in with Google</p>
                </div>
                <div className="Facebook-SignIn">
                  <img className="GoogleImg" src={FacebookImg} alt="" />
                  <p>Sign in with Facebook</p>
                </div> */}
                <div className="SignUp-request">
                  <p>Don't you have an account? <span className="sign-up-decor">Sign up</span> </p>
                </div>
              </div>
            </div>
          </div>
          <div className="Design"></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
