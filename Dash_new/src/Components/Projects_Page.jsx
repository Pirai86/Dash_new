//Common
import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./Global";

//Assets

import CompanyLogo_Img from "../assets/logo_no_background.svg";
import Home_Icon from "../assets/home-svgrepo-com.svg";
import Right_Arrow from "../assets/right-arrow.svg";
import People_Icon from "../assets/people-icon.svg";
import Star_Icon from "../assets/star-icon.svg";
import Project_Icon from "../assets/project-icon.svg";
import Notify from "../assets/bell.svg";
import Person from "../assets/person.svg";
import Search from "../assets/search.svg";
import Filter from "../assets/filter.svg";
import Add from "../assets/plus.svg";
import Add_Color from "../assets/plus-color.svg";
import Options from "../assets/options.svg";
import Project_Icon_Image from "../assets/project-icon-image.png";
import Wrong from "../assets/wrong.svg";
import Tag from "../assets/code-tag.svg";
import Update from "../assets/update.svg"


function Projects_Page() {

  const {
    isNavHomeActivated, setisNavHomeActivated,
    isNavTeamActivated, setisNavTeamActivated,
    isNavFavActivated, setisNavFavActivated
  } = useContext(GlobalContext);

  const ActivateNavSection = (sectionName) => {
    setisNavHomeActivated(false);
    setisNavTeamActivated(false);
    setisNavFavActivated(false);
    switch (sectionName) {
      case "Home":
        setisNavHomeActivated(true);
        console.log("CLick")
        break;
      case "Team":
        setisNavTeamActivated(true);
        break;
      case "Fav":
        setisNavFavActivated(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="background">
      <div className="bg-main-container">

        {/*************************************************  Navigation Bar *****************************************************/}
        <div className="navbar">
          <div className="company-logo">
            <img className="company-logo-img" src={CompanyLogo_Img} alt="" />
          </div>
          <div className="navbar-contents">
            <div className={`navbar-home ${isNavHomeActivated ? "activated" : ""}`} onClick={() => ActivateNavSection("Home")}>
              <div className="logo-text">
                <img className="home-logo-img" src={Home_Icon} alt="" />
                <div className="nav-text">
                  <p>Home</p>
                </div>
              </div>
              <div className="right-arrow">
                <img className="right-arrow-img" src={Right_Arrow} alt="" />
              </div>
            </div>

            <div className={`navbar-team ${isNavTeamActivated ? "activated" : ""}`} onClick={() => ActivateNavSection("Team")}>
              <div className="logo-text">
                <img className="people-logo-img" src={People_Icon} alt="" />
                <div className="nav-text">
                  <p>My Team</p>
                </div>
              </div>
              <div className="right-arrow">
                <img className="right-arrow-img" src={Right_Arrow} alt="" />
              </div>
            </div>

            <div className={`navbar-fav ${isNavFavActivated ? "activated" : ""}`} onClick={() => ActivateNavSection("Fav")}>
              <div className="logo-text">
                <img className="star-logo-img" src={Star_Icon} alt="" />
                <div className="nav-text">
                  <p>Starred Projects</p>
                </div>
              </div>
              <div className="right-arrow">
                <img className="right-arrow-img" src={Right_Arrow} alt="" />
              </div>
            </div>

            `{/*************************************************  Project List *****************************************************/}

            <div className="nav-projects-container">
              <div className="nav-project-title">
                <p>projects</p>
              </div>
              <div className="nav-project-list-container">
                <div className="navbar-project">
                  <div className="logo-text">
                    <img className="project-logo-img" src={Project_Icon} alt="" />
                    <div className="nav-text">
                      <p>Project Name 1</p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <img className="right-arrow-img" src={Right_Arrow} alt="" />
                  </div>
                </div>

                <div className="navbar-project">
                  <div className="logo-text">
                    <img className="project-logo-img" src={Project_Icon} alt="" />
                    <div className="nav-text">
                      <p>Project Name 2</p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <img className="right-arrow-img" src={Right_Arrow} alt="" />
                  </div>
                </div>

                <div className="navbar-project">
                  <div className="logo-text">
                    <img className="project-logo-img" src={Project_Icon} alt="" />
                    <div className="nav-text">
                      <p>Project Name 3</p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <img className="right-arrow-img" src={Right_Arrow} alt="" />
                  </div>
                </div>

                <div className="navbar-project">
                  <div className="logo-text">
                    <img className="project-logo-img" src={Project_Icon} alt="" />
                    <div className="nav-text">
                      <p>Project Name 4</p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <img className="right-arrow-img" src={Right_Arrow} alt="" />
                  </div>
                </div>

                <div className="navbar-project">
                  <div className="logo-text">
                    <img className="project-logo-img" src={Project_Icon} alt="" />
                    <div className="nav-text">
                      <p>Project Name 5</p>
                    </div>
                  </div>
                  <div className="right-arrow">
                    <img className="right-arrow-img" src={Right_Arrow} alt="" />
                  </div>
                </div>
              </div>
            </div>
            {/*************************************************  Project List End *****************************************************/}

            {/*************************************************  Bottom Button *****************************************************/}
            <div className="nav-Import-Btn-container">
              <div className="nav-Import-Btn">
                <p>Import a Backup</p>
              </div>
            </div>
            {/*************************************************  Bottom Button End *****************************************************/}
          </div>
        </div>
        {/*************************************************  Navigation Bar End *****************************************************/}

        {/*************************************************  Main Content*****************************************************/}
        <div className="main-content-container">
          <div className="content-topbar">
            <div className="Welcome-message">
              <p>Welcome to GrepBio</p>
            </div>
            <div className="searchBar-btn-notify-account">
              <div className="searchBar">
                <img className="searchBar-img" src={Search} alt="" />
                <p>Search</p>
              </div>
              <div className="Invite-Btn">
                <p>Invite Member</p>
              </div>
              <div className="Notify">
                <img className="Notify-img" src={Notify} alt="" />
              </div>
              <div className="Account">
                <img className="Person-img" src={Person} alt="" />
              </div>
            </div>
          </div>
          <div className="content-middlebar">
            <div className="your-projects-container">
              <div className="your-projects">
                <p className="text-proj">Your Projects</p>
                <div className="line"></div>
                <div className="filter-newProj">
                  <div className="filter-img-container">
                    <img className="filter-img" src={Filter} alt="" />
                  </div>
                  <div className="New-Project-Btn">
                    <img className="Add-img" src={Add} alt="" />
                    <p className="text">New Project</p>
                  </div>
                </div>
              </div>
              <div className="your-projects-list">
                <div className="project-box">
                  <div className="project-img">
                    <img className="proj-icon-img" src={Project_Icon_Image} alt="" />
                  </div>
                  <div className="project-content">
                    <div className="projectName-description">
                      <p className="proj-name">Project Name 1</p>
                      <p className="proj-desc">Project 1 Description</p>
                    </div>
                    <div className="project-details">
                      <div className="owner-expno">
                        <div className="Owner-Name">
                          <p>Owner : &nbsp;</p>
                          <p className="projects-values">Piraisudan R</p>
                        </div>
                        <div className="ExpNo">
                          <p>No of Experiments :&nbsp;</p>
                          <p className="projects-values">10</p>
                        </div>
                      </div>
                      <div className="creation-lastModified">
                        <div className="creation-date">
                          <p>Creation Date :&nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                        <div className="last-modified-date">
                          <p>Last Modified Date : &nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="more-options">
                    <img className="options-img" src={Options} alt="" />
                  </div>
                </div>

                <div className="project-box">
                  <div className="project-img">
                    <img className="proj-icon-img" src={Project_Icon_Image} alt="" />
                  </div>
                  <div className="project-content">
                    <div className="projectName-description">
                      <p className="proj-name">Project Name 2</p>
                      <p className="proj-desc">Project 2 Description</p>
                    </div>
                    <div className="project-details">
                      <div className="owner-expno">
                        <div className="Owner-Name">
                          <p>Owner : &nbsp;</p>
                          <p className="projects-values">Piraisudan R</p>
                        </div>
                        <div className="ExpNo">
                          <p>No of Experiments :&nbsp;</p>
                          <p className="projects-values">10</p>
                        </div>
                      </div>
                      <div className="creation-lastModified">
                        <div className="creation-date">
                          <p>Creation Date :&nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                        <div className="last-modified-date">
                          <p>Last Modified Date : &nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="more-options">
                    <img className="options-img" src={Options} alt="" />
                  </div>
                </div>

                <div className="project-box">
                  <div className="project-img">
                    <img className="proj-icon-img" src={Project_Icon_Image} alt="" />
                  </div>
                  <div className="project-content">
                    <div className="projectName-description">
                      <p className="proj-name">Project Name 3</p>
                      <p className="proj-desc">Project 3 Description</p>
                    </div>
                    <div className="project-details">
                      <div className="owner-expno">
                        <div className="Owner-Name">
                          <p>Owner : &nbsp;</p>
                          <p className="projects-values">Piraisudan R</p>
                        </div>
                        <div className="ExpNo">
                          <p>No of Experiments :&nbsp;</p>
                          <p className="projects-values">10</p>
                        </div>
                      </div>
                      <div className="creation-lastModified">
                        <div className="creation-date">
                          <p>Creation Date :&nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                        <div className="last-modified-date">
                          <p>Last Modified Date : &nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="more-options">
                    <img className="options-img" src={Options} alt="" />
                  </div>
                </div>

                <div className="project-box">
                  <div className="project-img">
                    <img className="proj-icon-img" src={Project_Icon_Image} alt="" />
                  </div>
                  <div className="project-content">
                    <div className="projectName-description">
                      <p className="proj-name">Project Name 4</p>
                      <p className="proj-desc">Project 4   Description</p>
                    </div>
                    <div className="project-details">
                      <div className="owner-expno">
                        <div className="Owner-Name">
                          <p>Owner : &nbsp;</p>
                          <p className="projects-values">Piraisudan R</p>
                        </div>
                        <div className="ExpNo">
                          <p>No of Experiments :&nbsp;</p>
                          <p className="projects-values">10</p>
                        </div>
                      </div>
                      <div className="creation-lastModified">
                        <div className="creation-date">
                          <p>Creation Date :&nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                        <div className="last-modified-date">
                          <p>Last Modified Date : &nbsp;</p>
                          <p className="projects-values">12/12/24</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="more-options">
                    <img className="options-img" src={Options} alt="" />
                  </div>
                </div>

              </div>
              <div className="More-Projects-Container">
                <div className="more-proj-line">

                </div>
                <div className="more-proj-btn">
                  <p>More Projects</p>
                </div>
                <div className="more-proj-line">

                </div>
              </div>
              <div className="Copyrights-Container">
                <p>GrepBio &copy; 2024</p>
              </div>
            </div>
            <div className="activity-feed-container">
              <div className="activity-feed">
                <p className="text-activity">Activity Feed</p>
                <div className="line-activity"></div>
              </div>
              <div className="activity-feed-list">
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Wrong} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title">Error</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Add_Color} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title" style={{color:"#fe0970"}}>New Project</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Tag} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title" style={{color:"#0f91ab"}}>Code Deployment</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Update} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title" style={{color:"#a918a8"}}>Update</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Add_Color} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title" style={{color:"#fe0970"}}>New Project</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Tag} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title" style={{color:"#0f91ab"}}>Code Deployment</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>
                <div className="activity-feed-content">
                  <div className="icon-content">
                    <div className="activity-icon">
                      <img className="wrong-img" src={Update} alt="" />
                    </div>
                    <div className="activity-content">
                      <p className="content-title" style={{color:"#a918a8"}}>Update</p>
                      <p className="content-content">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur cum laboriosam impedit</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects_Page;