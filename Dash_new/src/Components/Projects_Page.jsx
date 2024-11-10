//Common
import React, { useState, useEffect, useContext, useRef } from "react";
import "../Styles/ProjectsPage.css";
import "../Styles/NewProject.css";
import { GlobalContext } from "./Global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "./Table";

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
import Project_Icon_Image from "../assets/project-icon-image.png";
import Wrong from "../assets/wrong.svg";
import Tag from "../assets/code-tag.svg";
import Update from "../assets/update.svg"
import Delete from "../assets/Delete.png";
import Delete_Red from "../assets/Delete-Red.png";
import WarningImg from "../assets/icons8-warning.png";
import LeftArrow from "../assets/left-arrow.png";
import AddImg from "../assets/plus.png";
import ExpImg from "../assets/exp-img.png";
import ExpTypeCheck from "../assets/ExpTypeTick.png";
import Edit from "../assets/edit.png";
import LogOut from "../assets/log-out.png";
import ExpSetupImg from "../assets/ExpSetup.svg";
import ExpSetupBlueImg from "../assets/Exp-Setup-Blue.svg";
import SamplesImg from "../assets/Samples.png";
import SamplesBlueImg from "../assets/SamplesBlue.png";
import ExpressionImg from "../assets/Expression.png";
import ExpressionBlueImg from "../assets/ExpressionBlue.png";
import ComparisonImg from "../assets/Comparison.png";
import ComparisonBlueImg from "../assets/ComparisonBlue.png";
import MainEffectsImg from "../assets/MainEffectsImg.png";
import MainEffectsBlueImg from "../assets/MainEffectsBlueImg.png";
import DataQualityImg from "../assets/DataQuality.png";
import DataQualityBlueImg from "../assets/DataQualityBlue.png";
import Right_Arrow_Header from "../assets/right-arrow-header.png";

import { faSleigh } from "@fortawesome/free-solid-svg-icons";

import ExpSetup_QualitySummary_Comp from "./1.ExpSetup/1.ExpSetup_QualitySummary/ExpSetup_QualitySummary_Comp";
import ExpSetup_QualitySummary_Control_Comp from "./1.ExpSetup/1.ExpSetup_QualitySummary/ExpSetup_QualitySummary_Control_Comp";
import ExpSetup_MetaData_Comp from "./1.ExpSetup/2.ExpSetup_Metadata/ExpSetup_MetaData_Comp";

import Samples_CountsNormalisation_Comp from "./2.Samples/1.Samples_CountsNormalisation/Samples_CountsNormalisation_Comp";
import Samples_CountsNormalisation_Control_Comp from "./2.Samples/1.Samples_CountsNormalisation/Samples_CountsNormalisation_Control_Comp";

import DropDownComboBox from "../Components/DropDownComboBox";

import ExpSetup_QualitySummary_Notes from "../Notes/1.Exp_Setup/1.ExpSetup_QualitySummary_Notes";



const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;


function Projects_Page() {

  const containerRef = useRef(null);
  const navigate = useNavigate();

  const {
    jwt, userfullName,
    isNavHomeActivated, setisNavHomeActivated, setglobalExperimentID,
    isNavTeamActivated, setisNavTeamActivated,
    isNavFavActivated, setisNavFavActivated,
    projectsName, totalProjects, projectsDesc, CreatedON, LastModifiedON, projectsID, totalExperiments, experimentsName, experimentsDesc, experimentsID,
    setexperimentsName, setexperimentsDesc, setexperimentsID, setExpCreatedON, setExpLastModifiedON, settotalExperiments,
    appendToexperimentsName, appendToexperimentsID, appendToexperimentsDesc, appendToExpCreatedON, appendToExpLastModifiedON, appendToexperimentsStatus,
    globalProjID, set_globalProjID, globalProjCardIndex, set_globalProjCardIndex, experimentsStatus, setexperimentsStatus, isGotoExperimentClicked, setisGotoExperimentClicked,
    setExpSetup_QualitySummary_Data, setExpSetup_QualitySummary_Control_Data, setExpSetup_QualitySummary_xcat, setExpSetup_QualitySummary_ycat,
    setExpSetup_Metadata_Data, setExpSetup_Metadata_Covariate,
    ExpSetup_Metadata_ColHeader, setExpSetup_Metadata_ColHeader,
    setSamples_CountsNormalisation_Control_DataList, setSamples_CountsNormalisation_Control_DataSelection, setisCountsNormalisationEmpty,
    setisQualitySummaryEmpty, setisMetadataEmpty,
    setExpSetup_QualitySummary_RowLength, setExpSetup_QualitySummary_ColLength,
  } = useContext(GlobalContext);

  const {
    settotalProjects,
    appendToprojectsName,
    appendToprojectsID,
    appendToprojectsDesc,
    appendToCreatedON,
    appendToLastModifiedON,
    appendToprojectsIsDemo,
  } = useContext(GlobalContext);

  const {
    setprojectsName,
    setprojectsID,
    setprojectsDesc,
    setCreatedON,
    setLastModifiedON,
    setprojectsIsDemo
  } = useContext(GlobalContext);

  const [isFilterActivated, setisFilterActivated] = useState(false);
  const [IsHovered, setIsHovered] = useState(false);
  const [IsExpSteupHovered, setIsExpSteupHovered] = useState(false);
  const [IsSamplesHovered, setIsSamplesHovered] = useState(false);
  const [IsExpressionHovered, setIsExpressionHovered] = useState(false);
  const [IsComparisonHovered, setIsComparisonHovered] = useState(false);
  const [IsMainEffectsHovered, setIsMainEffectsHovered] = useState(false);
  const [IsDataQualityHovered, setIsDataQualityHovered] = useState(false);
  const [EmptyExpCount, setEmptyExpCount] = useState(false);
  const [SelectedProjectTitle, setSelectedProjectTitle] = useState(null);
  const [SelectedExpTitle, setSelectedExpTitle] = useState(null);
  const [isNewProjectClicked, setNewProjectClicked] = useState(false);
  const [NewProjTitle, setNewProjTitle] = useState("");
  const [NewProjDesc, setNewProjDesc] = useState("");
  const [isNewProjTitleEmpty, setNewProjTitleEmpty] = useState(false);
  const [DisplayProjMoreOptions, setDisplayProjMoreOptions] = useState(false);
  const [SelectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [DeleteDemoProj, setDeleteDemoProj] = useState(false);
  const [DeleteProjClicked, setDeleteProjClicked] = useState(false);
  const [isDeleteProjClicked, setisDeleteProjClicked] = useState(false);
  const [isGotoProjectClicked, setisGotoProjectClicked] = useState(false);
  const [experimentsCount, setExperimentsCount] = useState(Array(totalProjects).fill(null));
  const [BulkRNASelected, setBulkRNASelected] = useState(false);
  const [SingleCellSelected, setSingleCellSelected] = useState(false);
  const [MetagenomicsSelected, setMetagenomicsSelected] = useState(false);
  const [ProteomicsSelected, setProteomicsSelected] = useState(false);
  const [WholeGenomeSelected, setWholeGenomeSelected] = useState(false);
  const [ProjectBoxClick, setProjectBoxClick] = useState(false);

  const [TableColHeaderLength_Metadata, setTableColHeaderLength_Metadata] = useState(0);

  const [EditQCClicked, setEditQCClicked] = useState(false);
  const [EditCountsNormalisationClicked, setEditCountsNormalisationClicked] = useState(false);

  const [NotesQCClicked, setNotesQCClicked] = useState(false);
  const [NotesMetadataClicked, setNotesMetadataClicked] = useState(false);
  const [NotesCountsNormalisationClicked, setNotesCountsNormalisationClicked] = useState(false);

  const [ProjNameForInfo, setProjNameForInfo] = useState("");
  const [ProjDescForInfo, setProjDescForInfo] = useState("");
  const [ProjCreatedForInfo, setProjCreatedForInfo] = useState("");
  const [ProjModifiedForInfo, setProjModifiedForInfo] = useState("");
  const [OwnerName, setOwnerName] = useState(userfullName);

  const [ExpCategory_ExpSetupClicked, setExpCategory_ExpSetupClicked] = useState(true);
  const [ExpCategory_SamplesClicked, setExpCategory_SamplesClicked] = useState(false);
  const [ExpCategory_ExpressionClicked, setExpCategory_ExpressionClicked] = useState(false);
  const [ExpCategory_ComparisonClicked, setExpCategory_ComparisonClicked] = useState(false);
  const [ExpCategory_MainEffectsClicked, setExpCategory_MainEffectsClicked] = useState(false);
  const [ExpCategory_DataQualityClicked, setExpCategory_DataQualityClicked] = useState(false);

  const [QualitySummaryClicked, setQualitySummaryClicked] = useState(false);
  const [MetadataClicked, setMetadataClicked] = useState(false);

  const [CountsNormalisationClicked, setCountsNormalisationClicked] = useState(false);
  const [CorrelationHeatmapClicked, setCorrelationHeatmapClicked] = useState(false);
  const [PCAClicked, setPCAClicked] = useState(false);
  const [SampleSetClicked, setSampleSetClicked] = useState(false);

  const highlightedColumns = [1, 2];
  const highlightedColors = ["#e0e4f4", "#d4edda"];
  const tableWidth = '350px';
  const tableHeight = '140px';
  const maxHeight = "130px";
  const rowHeight = "40px";
  const colHeaderColor = "#ff5a1f";
  const resultName = "Experiments";
  const tableFontSize = "11px";
  const paddingLeftRight = "5px";
  const filterColor = "#e9a7cb";


  const [Tabledata, setTableData] = useState({
    "columnNames": ["Name", "Type", "Status"],
    "data": []
  });

  const [MetadataTabledata, setMetadataTabledata] = useState({
    "columnNames": [],
    "data": []
  })

  // Pass the entries array as a prop
  const entriesOptions = [30];

  const entriesOptions2 = [2, 4];


  useEffect(() => {
    if (isFilterActivated) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [isFilterActivated]);

  useEffect(() => {
    const fetchExperimentsCount = async () => {
      const counts = Array(totalProjects).fill(null);

      for (let i = 0; i < projectsID.length; i++) {
        try {
          const response = await axios.get(
            `${BACKEND_API_URL}dashboard/experiments?proj_id=${projectsID[i]}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          );
          counts[i] = response.data.n_expts;
        } catch (error) {
          console.error("Error fetching experiment count:", error);
          counts[i] = "Error"; // Optional: handle error state
        }
      }

      setExperimentsCount(counts);
    };

    fetchExperimentsCount();
  }, [projectsID, jwt, totalProjects]);


  const NewProjectClick = () => {
    setNewProjectClicked(true);
    setNewProjTitleEmpty(false);
  }

  const CancelProjCreation = () => {
    setNewProjectClicked(false);
    setNewProjTitleEmpty(false);
    setNewProjTitle("");
    setNewProjDesc("");
  }

  const CreateNewProject = () => {
    if (!NewProjTitle) {
      setNewProjTitleEmpty(true);
      return;
    }
    else {
      axios
        .post(
          BACKEND_API_URL + "dashboard/create_project",
          {
            project_name: NewProjTitle,
            project_notes: NewProjDesc,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          // Handle successful response
          console.log("Response data: for Creating new project", response);

          axios
            .get(BACKEND_API_URL + "dashboard/projects", {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            })
            .then((response_success) => {
              // Handle successful response
              console.log(
                "Response data: Fetching all projects",
                response_success
              );

              settotalProjects(response_success.data.n_projects);
              setprojectsName([]);
              setprojectsID([]);
              setprojectsDesc([]);
              setCreatedON([]);
              setLastModifiedON([]);
              setprojectsIsDemo([]);

              response_success.data.projects.forEach((project) => {
                appendToprojectsName(project.project_name);
                appendToprojectsID(project.project_id);
                appendToprojectsDesc(project.project_notes);
                appendToCreatedON(project.created_on);
                appendToLastModifiedON(project.last_modified);
                appendToprojectsIsDemo(project.is_demo);
              });

              setProjectBoxClick(false);

            })
            .catch((error) => {
              console.log("Error : ", error)
              // if (error.response.status === 401) {
              //   //console.log('Unauthorized access - possible invalid token');
              //   navigate("/login");
              // }
            });
        })
        .catch((error) => {
          // if (error.response.status === 401) {
          //   //console.log('Unauthorized access - possible invalid token');
          //   navigate("/login");
          // }
        });

      setNewProjTitle("");
      setNewProjDesc("");
      setNewProjectClicked(false);
    }
  }

  const handleDeleteExp_Popup = () => {

  }

  const handleDeleteProject_Popup = (index) => {
    setDeleteDemoProj(false);
    if (index === "GlobalProj") {
      console.log("Correct");
      axios
        .get(BACKEND_API_URL + "dashboard/project_info?proj_id=" + globalProjID, {
          headers: { Authorization: `Bearer ${jwt}` },
          accept: "application/json"
        })
        .then((response) => {
          console.log("Checking Popup : ", response.data.is_demo);
          if (response.data.is_demo === true) {
            setDeleteDemoProj(true);

            return;
          }
          else {
            setDeleteDemoProj(false);
            setDeleteProjClicked(true);
          }
        })
        .catch((error) => {
          // if (error.response.status === 401) {
          //   console.log("Unauthorized access - possible invalid token");
          //   navigate("/login");
          // }
        });
    }

    else {
      console.log("Proj ID : ", projectsID[index]);
      set_globalProjID(projectsID[index]);
      axios
        .get(BACKEND_API_URL + "dashboard/project_info?proj_id=" + projectsID[index], {
          headers: { Authorization: `Bearer ${jwt}` },
          accept: "application/json"
        })
        .then((response) => {
          console.log("Checking Popup : ", response.data.is_demo);
          if (response.data.is_demo === true) {
            setDeleteDemoProj(true);
            return;
          }
          else {
            setDeleteDemoProj(false);
            setDeleteProjClicked(true);
          }
        })
        .catch((error) => {
          // if (error.response.status === 401) {
          //   console.log("Unauthorized access - possible invalid token");
          //   navigate("/login");
          // }
        });
    }

  }

  const handleDeleteDemoProject_OK = () => {
    setDeleteDemoProj(false);
  }

  const handleDeleteProject_no = () => {
    setDeleteProjClicked(false);
  }

  const handleDeleteProject_yes = () => {
    console.log("Checking in Deletion : ", globalProjID);
    setProjectBoxClick(false);
    setisGotoExperimentClicked(false);
    if (globalProjID) {
      setDeleteProjClicked(false);
      axios
        .post(
          `${BACKEND_API_URL}dashboard/delete_project?proj_id=${globalProjID}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              accept: "application/json",
            },
          }
        )
        .then((response) => {
          // Handle successful response
          console.log("Proj Deleted!");
          // Fetch updated projects list
          axios
            .get(BACKEND_API_URL + "dashboard/projects", {
              headers: { Authorization: `Bearer ${jwt}` },
            })
            .then((projectsResponse) => {
              console.log("Project Update Response : ", projectsResponse)
              // Update the state with the new project details directly
              const updatedProjects = projectsResponse.data.projects;

              const newProjectsName = updatedProjects.map((project) => project.project_name);
              const newProjectsID = updatedProjects.map((project) => project.project_id);
              const newProjectsDesc = updatedProjects.map((project) => project.project_notes);
              const newCreatedOn = updatedProjects.map((project) => project.created_on);
              const newLastModifiedOn = updatedProjects.map((project) => project.last_modified);
              const newIsDemo = updatedProjects.map((project) => project.is_demo);

              settotalProjects(updatedProjects.length);
              setprojectsName(newProjectsName);
              setprojectsID(newProjectsID);
              setprojectsDesc(newProjectsDesc);
              setCreatedON(newCreatedOn);
              setLastModifiedON(newLastModifiedOn);
              setprojectsIsDemo(newIsDemo);
              // Set flag to indicate that a project was deleted
              //setisDeleteProjClicked(true);
              setisGotoProjectClicked(false);
            })
            .catch((error) => {
              //console.log("Error fetching projects: ", error);
            });

          //setisDeleteProjClicked(false);

        })
        .catch((error) => {
          // //console.log("Error Delete Proj : ", error);
          // setisDeleteProjClicked(false);
          // if (error.response.status === 401) {
          //   setisDeleteProjClicked(false);
          //   //console.log("Unauthorized access - possible invalid token");
          //   navigate("/login");
          // }
        });
    }
  };

  const handleGoBackToProjectsPage = () => {
    setisGotoProjectClicked(false);
    setisGotoExperimentClicked(false);
  }

  const handleGoBackToExptsPage = () => {
    setisGotoProjectClicked(true);
    setisGotoExperimentClicked(false);
  }

  const ActivateNavSection = (sectionName) => {
    setisNavHomeActivated(false);
    setisNavTeamActivated(false);
    setisNavFavActivated(false);
    switch (sectionName) {
      case "Home":
        setisNavHomeActivated(true);
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

  const ActivateExpCategory = (Category) => {

    setExpCategory_ExpSetupClicked(false);
    setExpCategory_SamplesClicked(false);
    setExpCategory_ExpressionClicked(false);
    setExpCategory_ComparisonClicked(false);
    setExpCategory_MainEffectsClicked(false);
    setExpCategory_DataQualityClicked(false);

    setQualitySummaryClicked(false);
    setMetadataClicked(false);

    setCountsNormalisationClicked(false);
    setCorrelationHeatmapClicked(false);
    setPCAClicked(false);
    setSampleSetClicked(false);

    setNotesQCClicked(false);
    setNotesCountsNormalisationClicked(false);

    switch (Category) {
      case "Exp-Setup":
        setExpCategory_ExpSetupClicked(true);
        setQualitySummaryClicked(true);
        setNotesQCClicked(true);
        break;
      case "Samples":
        setExpCategory_SamplesClicked(true);
        setCountsNormalisationClicked(true);
        setNotesCountsNormalisationClicked(true);
        break;
      case "Expression":
        setExpCategory_ExpressionClicked(true);
        break;
      case "Comparison":
        setExpCategory_ComparisonClicked(true);
        break;
      case "Main-Effects":
        setExpCategory_MainEffectsClicked(true);
        break;
      case "Data-Quality":
        setExpCategory_DataQualityClicked(true);
        break;
      default:
        break;
    }
  }

  const OnFilterClick = () => {
    setisFilterActivated(!isFilterActivated);
  }

  const getExperimentsCount = (index) => {
    return experimentsCount[index] !== null
      ? experimentsCount[index]
      : "Loading..."; // Show loading while fetching
  };

  const handleGotoProject = (index) => {

    setisGotoProjectClicked(true);
    setisGotoExperimentClicked(false);

    setexperimentsName([]);
    setexperimentsID([]);
    setexperimentsDesc([]);
    setExpCreatedON([]);
    setExpLastModifiedON([]);

    set_globalProjID(projectsID[index]);

    axios
      .get(
        `${BACKEND_API_URL}dashboard/experiments?proj_id=${projectsID[index]}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        settotalExperiments(response.data.n_expts);
        if (response.data.n_expts) {
          setEmptyExpCount(true);
        }
        else {
          setEmptyExpCount(false);
        }

        {
          Array.from(
            { length: response.data.n_expts },
            (_, j) => (
              appendToexperimentsName(response.data.expts[j].expt_name),
              appendToexperimentsStatus(response.data.expts[j].status),
              appendToexperimentsID(response.data.expts[j].expt_id),
              appendToexperimentsDesc(response.data.expts[j].expt_notes),
              appendToExpCreatedON(response.data.expts[j].created_on),
              appendToExpLastModifiedON(response.data.expts[j].last_modified)
            )
          );
        }

        const experiments = response.data.expts || [];


        // Map the experiments to the format required for Tabledata
        const newData = experiments.map((experiment) => ({
          Name: experiment.expt_name,
          Type: "BulkRNAseq",
          Status: experiment.status,
        }));

        // Update the tableData state
        setTableData((prevData) => ({
          ...prevData,
          "data": newData,
        }));
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Unauthorized access - possible invalid token");
          navigate("/");
        } else {
          console.log("Error:", error);
        }
      });

    // Update title and description based on the selected project
    setSelectedProjectTitle(`${projectsName[index]}`);

  };

  const handleGotoExperiment = (index) => {
    console.log("Exp ID : ", experimentsID[index]);

    setSelectedExpTitle(experimentsName[index]);
    setExpCategory_ExpSetupClicked(true);
    setExpCategory_SamplesClicked(false);
    setExpCategory_ExpressionClicked(false);
    setExpCategory_ComparisonClicked(false);
    setExpCategory_MainEffectsClicked(false);
    setExpCategory_DataQualityClicked(false);

    setQualitySummaryClicked(true);
    setNotesQCClicked(true);

    setMetadataClicked(false);
    setNotesMetadataClicked(false);

    setCountsNormalisationClicked(false);
    setNotesCountsNormalisationClicked(false);

    setCorrelationHeatmapClicked(false);
    setPCAClicked(false);
    setSampleSetClicked(false);

    setisGotoExperimentClicked(true);
    setglobalExperimentID(experimentsID[index]);

    ////////////////////////////////////////////////////////////////////////////// Quality Summary Axios ///////////////////////////////////////////////////////////////////////////
    axios
      .get(
        BACKEND_API_URL +
        "expt_setup/quality_summary?expt_id=" +
        experimentsID[index],
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        setisQualitySummaryEmpty(false);

        setExpSetup_QualitySummary_Data(null);
        setExpSetup_QualitySummary_Control_Data(null);
        setExpSetup_QualitySummary_xcat(null);
        setExpSetup_QualitySummary_ycat(null);

        setExpSetup_QualitySummary_Data(response.data.data);
        setExpSetup_QualitySummary_Control_Data(response.data.data);
        setExpSetup_QualitySummary_xcat(response.data.xcats);
        setExpSetup_QualitySummary_ycat(response.data.ycats);

        // console.log("Data", response.data.data);
        // console.log("Data Length", response.data.data.length);
        setExpSetup_QualitySummary_RowLength(response.data.data.length);
        // console.log("Xcat", response.data.xcats);
        // console.log("Xcat Length", response.data.xcats.length);
        setExpSetup_QualitySummary_ColLength(response.data.xcats.length);
        // console.log("YCta", response.data.ycats);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setisQualitySummaryEmpty(true);
        }

        if (error.response.status === 401) {
          //console.log("Unauthorized access - possible invalid token");
          navigate("/login");
        }

      })

    ////////////////////////////////////////////////////////////////////////////// Metdata Axios ///////////////////////////////////////////////////////////////////////////

    axios
      .get(
        BACKEND_API_URL +
        "expt_setup/metadata_file_contents?expt_id=" +
        experimentsID[index],
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        setisMetadataEmpty(false);
        // Handle successful response
        setExpSetup_Metadata_Data(response.data.file_contents);
        setExpSetup_Metadata_Covariate(response.data.all_covariates);
        setExpSetup_Metadata_ColHeader(response.data.file_headers);



        setMetadataTabledata(() => ({
          "data": response.data.file_contents,
          "columnNames": response.data.file_headers
        }));

        console.log("Updated MetadataTabledata:", {
          "data": response.data.file_contents,
          "columnNames": response.data.file_headers
        });


        setTableColHeaderLength_Metadata(response.data.file_headers.length);
        console.log("Headers data: ", response.data.file_headers.length);

        console.log("Metadata data : ", response.data.file_contents);
        console.log("Covariates : ", response.data.all_covariates);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setisMetadataEmpty(true);
        }
        if (error.response.status === 401) {
          //console.log("Unauthorized access - possible invalid token");
          navigate("/login");
        }
      })

    ////////////////////////////////////////////////////////////////////////////// Counts Normalisation Axios ///////////////////////////////////////////////////////////////////////////

    axios
      .get(
        BACKEND_API_URL +
        "samples/count_normalisation_categories?expt_id=" +
        experimentsID[index],
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        // Handle successful response
        setSamples_CountsNormalisation_Control_DataList(response.data.category_names);
        setSamples_CountsNormalisation_Control_DataSelection(response.data.category_names[0]);
        setisCountsNormalisationEmpty(false);
      })
      .catch((error) => {
        setisCountsNormalisationEmpty(true);
        if (error.response.status === 401) {
          //console.log("Unauthorized access - possible invalid token");
          navigate("/login");
        }
      })

  }

  const handleProjectBoxClick = (index) => {
    setProjectBoxClick(true);
    setProjNameForInfo(`${projectsName[index]}`);
    setProjDescForInfo(`${projectsDesc[index]}`);
    setProjCreatedForInfo(`${CreatedON[index]}`);
    setProjModifiedForInfo(`${LastModifiedON[index]}`);

    console.log("Project ID : ", projectsID[index]);

    set_globalProjID(projectsID[index]);

    axios
      .get(
        `${BACKEND_API_URL}dashboard/experiments?proj_id=${projectsID[index]}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        settotalExperiments(response.data.n_expts);
        if (response.data.n_expts) {
          setEmptyExpCount(true);
        }
        else {
          setEmptyExpCount(false);
        }

        {
          Array.from(
            { length: response.data.n_expts },
            (_, j) => (
              appendToexperimentsName(response.data.expts[j].expt_name),
              appendToexperimentsStatus(response.data.expts[j].status),
              appendToexperimentsID(response.data.expts[j].expt_id),
              appendToexperimentsDesc(response.data.expts[j].expt_notes),
              appendToExpCreatedON(response.data.expts[j].created_on),
              appendToExpLastModifiedON(response.data.expts[j].last_modified)
            )
          );
        }

        const experiments = response.data.expts || [];


        // Map the experiments to the format required for Tabledata
        const newData = experiments.map((experiment) => ({
          Name: experiment.expt_name,
          Type: "BulkRNAseq",
          Status: experiment.status,
        }));



        // Update the tableData state
        setTableData((prevData) => ({
          ...prevData,
          "data": newData,
        }));


      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Unauthorized access - possible invalid token");
          navigate("/");
        } else {
          console.log("Error:", error);
        }
      });

    setSelectedProjectTitle(`${projectsName[index]}`);
  }

  const ActivateExpType = (ExpType) => {

    if (ExpType === "Bulk RNAseq") {
      if (BulkRNASelected === false) {
        setBulkRNASelected(true);
      }
      else {
        setBulkRNASelected(false);
      }
    }
    else if (ExpType === "SingleCell RNAseq") {
      if (SingleCellSelected === false) {
        setSingleCellSelected(true);
      }
      else {
        setSingleCellSelected(false);
      }
    }
    else if (ExpType === "Metagenomics") {
      if (MetagenomicsSelected === false) {
        setMetagenomicsSelected(true);
      }
      else {
        setMetagenomicsSelected(false);
      }
    }
    else if (ExpType === "Proteomics") {
      if (ProteomicsSelected === false) {
        setProteomicsSelected(true);
      }
      else {
        setProteomicsSelected(false);
      }
    }
    else if (ExpType === "Whole GenomeSeq") {
      if (WholeGenomeSelected === false) {
        setWholeGenomeSelected(true);
      }
      else {
        setWholeGenomeSelected(false);
      }
    }
  }

  const ActivateExp_SubCategory = (SubCategory) => {

    setQualitySummaryClicked(false);
    setMetadataClicked(false);

    setCountsNormalisationClicked(false);
    setCorrelationHeatmapClicked(false);
    setPCAClicked(false);
    setSampleSetClicked(false);

    setNotesQCClicked(false);
    setNotesMetadataClicked(false);
    setNotesCountsNormalisationClicked(false);

    switch (SubCategory) {
      case "QualitySummary":
        setQualitySummaryClicked(true);
        setNotesQCClicked(true);
        break;
      case "Metadata":
        setMetadataClicked(true);
        setNotesMetadataClicked(true);
        break;
      case "Counts_Normalisation":
        setCountsNormalisationClicked(true);
        setNotesCountsNormalisationClicked(true);
        break;
      case "Correlation_Heatmap":
        setCorrelationHeatmapClicked(true);
        break;
      case "PCA":
        setPCAClicked(true);
        break;
      case "Sample_Set":
        setSampleSetClicked(true);
        break;
      default:
        break;
    }

  }

  const handleEditClick = (Edit) => {
    switch (Edit) {
      case "QC":
        setEditQCClicked(!EditQCClicked);
        break;
      case "Counts_Normalisation":
        setEditCountsNormalisationClicked(!EditCountsNormalisationClicked);
        break;
      default:
        break;
    }
  }

  const handleNotesClick = (Notes) => {

    switch (Notes) {
      case "QC":
        setNotesQCClicked(!NotesQCClicked);
        break;
      case "Metadata":
        setNotesMetadataClicked(!NotesMetadataClicked);
        break;
      case "Counts_Normalisation":
        setNotesCountsNormalisationClicked(!NotesCountsNormalisationClicked);
        break;
      default:
        break;
    }
  }

  return (
    <div className="background">

      <div className={`ProjDeletion-Popup ${DeleteProjClicked ? "active" : ""}`}>
        <div className="Delete-Icon">
          <div className="Dotted-Circle">
            <div className="Inner-Dark-Circle">
              <div className="Outer-Circle">
                <div className="Inner-Circle">
                  <img className="Wrong-Img" src={Wrong} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Delete-content">
          <p className="title">Delete "{SelectedProjectTitle}"</p>
          <p className="content">All data will be lost. Do you still want to proceed?</p>
          <div className="Yes-No-Container">
            <div className="No-Container" onClick={handleDeleteProject_no}>
              <p>No</p>
            </div>
            <div className="Yes-Container" onClick={handleDeleteProject_yes}>
              <p>Yes</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`NewProjectPage ${isNewProjectClicked ? "" : "d-no"}`}>
        <div className="flex ai-c jc-c" style={{ width: "100%", height: "100vh" }}>
          <div className="NewProjectContainer">
            <div className="NewProjectContainer-Content">
              <p className="CreateNewProject-Text">Create a New Project</p>
              <div className={`NewProjectName-NewProjectDesc`}>
                <p>Project Name:</p>
                <input
                  className={`ProjectName-Input ${isNewProjTitleEmpty ? "EmptyProjTitle" : ""}`}
                  type="text"
                  value={NewProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="Enter Project Name"
                />
                {isNewProjTitleEmpty && (
                  <p className="Project-Name-Err">Project name is mandatory</p>
                )}
                <p className="NewProj-Desc">Project Description:</p>
                <textarea
                  type="text"
                  value={NewProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                  placeholder="Enter Project Description"
                />
              </div>
              <div className="Cancel-Create-NewProject">
                <div className="CancelProjCreation" onClick={CancelProjCreation}>
                  <p>Cancel</p>
                </div>
                <div className="ProjCreation" onClick={CreateNewProject}>
                  <p>Create</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-main-container">

        {/*************************************************  Navigation Bar *****************************************************/}

        <div className={`navbar ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
          <div className="company-logo">
            <img className={`company-logo-img ${isGotoExperimentClicked ? "GoToExp" : ""} `} src={CompanyLogo_Img} alt="" />
          </div>
          <div className="navbar-contents">
            <div className={`navbar-home ${isNavHomeActivated ? "activated" : ""}`} onClick={() => ActivateNavSection("Home")}>
              <div className="logo-text">
                <img className="home-logo-img" src={Home_Icon} alt="" />
                <div className={`nav-text ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                  <p>Home</p>
                </div>
              </div>
              <div className={`right-arrow ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                <img className="right-arrow-img" src={Right_Arrow} alt="" />
              </div>
            </div>

            <div className={`navbar-team ${isNavTeamActivated ? "activated" : ""}`} onClick={() => ActivateNavSection("Team")}>
              <div className="logo-text">
                <img className="people-logo-img" src={People_Icon} alt="" />
                <div className={`nav-text ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                  <p>My Team</p>
                </div>
              </div>
              <div className={`right-arrow ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                <img className="right-arrow-img" src={Right_Arrow} alt="" />
              </div>
            </div>

            <div className={`navbar-fav ${isNavFavActivated ? "activated" : ""}`} onClick={() => ActivateNavSection("Fav")}>
              <div className="logo-text">
                <img className="star-logo-img" src={Star_Icon} alt="" />
                <div className={`nav-text ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                  <p>Starred Projects</p>
                </div>
              </div>
              <div className={`right-arrow ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                <img className="right-arrow-img" src={Right_Arrow} alt="" />
              </div>
            </div>

            `{/*************************************************  Project List *****************************************************/}

            <div className="nav-projects-container">
              <div className={`nav-project-title ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                <p>recent projects <span className="pinkColor">(5)</span> &nbsp;/&nbsp; Total <span className="pinkColor">({totalProjects})</span> </p>
              </div>
              <div className="nav-project-list-container">

                {Array.from({ length: totalProjects < 5 ? totalProjects : 5 }, (_, i) => (
                  <div className="navbar-project" key={i} onClick={() => handleGotoProject(i)}>
                    <div className="logo-text">
                      <div className="project-logo-container">
                        <img className={`project-logo-img ${isGotoExperimentClicked ? "GoToExp" : ""}`} src={Project_Icon} alt="" />

                      </div>
                      <div className={`nav-text ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                        <p>{projectsName[i]}</p>
                      </div>
                    </div>
                    <div className={`right-arrow ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
                      <img className="right-arrow-img" src={Right_Arrow} alt="" />
                    </div>
                  </div>
                ))}

              </div>
            </div>
            {/*************************************************  Project List End *****************************************************/}

            {/*************************************************  Bottom Button *****************************************************/}
            <div className="nav-Import-Btn-container">
              <div className={`nav-Import-Btn ${isGotoExperimentClicked ? "d-no" : ""}`}>
                <p className={``}>Log Out</p>
              </div>
              <img className={`LogOutImg ${isGotoExperimentClicked ? "" : "d-no"}`} src={LogOut} alt="" />
            </div>
            {/*************************************************  Bottom Button End *****************************************************/}
          </div>
        </div>
        {/*************************************************  Navigation Bar End *****************************************************/}


        {/*************************************************  Experiment Main Categoryies Container Start *****************************************************/}

        <div className={`Exp-Main-Category-Container ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
          <div className="Exp-Main-Category-Content">
            {/* <div className="text">
              <p>Experiment Categories</p>
            </div> */}
            <div className="title">

              <div className="Experiment-Setup">

                <div className={`circle ${ExpCategory_ExpSetupClicked ? "hovered" : ""}`} onMouseEnter={() => setIsExpSteupHovered(true)} onMouseLeave={() => setIsExpSteupHovered(false)} onClick={() => ActivateExpCategory("Exp-Setup")}>
                  <img className={`Exp-Main-Category-Img ${IsExpSteupHovered ? "hovered" : ""} ${ExpCategory_ExpSetupClicked ? "hovered" : ""}`} src={ExpSetupImg} alt="" />
                  <img className={`Exp-Main-Category-Img3 ${IsExpSteupHovered ? "hovered" : ""} ${ExpCategory_ExpSetupClicked ? "hovered" : ""}`} src={ExpSetupBlueImg} alt="" />
                </div>


                <div className={`circle-outer ${IsExpSteupHovered ? "hovered" : ""} ${ExpCategory_ExpSetupClicked ? "clicked" : ""}`}></div>

                <p className={`text-category ${IsExpSteupHovered ? "hovered" : ""} ${ExpCategory_ExpSetupClicked ? "hovered" : ""}`}>Experiment Setup</p>
              </div>

              <div className="Samples">
                <div className={`circle-outer ${IsSamplesHovered ? "hovered" : ""} ${ExpCategory_SamplesClicked ? "clicked" : ""}`}></div>
                <div className={`circle ${ExpCategory_SamplesClicked ? "hovered" : ""}`} onMouseEnter={() => setIsSamplesHovered(true)} onMouseLeave={() => setIsSamplesHovered(false)} onClick={() => ActivateExpCategory("Samples")}>
                  <img className={`Exp-Main-Category-Img ${IsSamplesHovered ? "hovered" : ""} ${ExpCategory_SamplesClicked ? "hovered" : ""}`} src={SamplesImg} alt="" />
                  <img className={`Exp-Main-Category-Img3 ${IsSamplesHovered ? "hovered" : ""} ${ExpCategory_SamplesClicked ? "hovered" : ""}`} src={SamplesBlueImg} alt="" />
                </div>
                <p className={`text-category ${IsSamplesHovered ? "hovered" : ""} ${ExpCategory_SamplesClicked ? "hovered" : ""}`}>Samples</p>
              </div>

              <div className="Expression">
                <div className={`circle-outer ${IsExpressionHovered ? "hovered" : ""} ${ExpCategory_ExpressionClicked ? "clicked" : ""}`}></div>
                <div className={`circle ${ExpCategory_ExpressionClicked ? "hovered" : ""}`} onMouseEnter={() => setIsExpressionHovered(true)} onMouseLeave={() => setIsExpressionHovered(false)} onClick={() => ActivateExpCategory("Expression")}>
                  <img className={`Exp-Main-Category-Img ${IsExpressionHovered ? "hovered" : ""} ${ExpCategory_ExpressionClicked ? "hovered" : ""}`} src={ExpressionImg} alt="" />
                  <img className={`Exp-Main-Category-Img3 ${IsExpressionHovered ? "hovered" : ""} ${ExpCategory_ExpressionClicked ? "hovered" : ""}`} src={ExpressionBlueImg} alt="" />
                </div>
                <p className={`text-category ${IsExpressionHovered ? "hovered" : ""} ${ExpCategory_ExpressionClicked ? "hovered" : ""}`}>Expression</p>
              </div>

              <div className="Comparison">
                <div className={`circle-outer ${IsComparisonHovered ? "hovered" : ""} ${ExpCategory_ComparisonClicked ? "clicked" : ""}`}></div>
                <div className={`circle ${ExpCategory_ComparisonClicked ? "hovered" : ""}`} onMouseEnter={() => setIsComparisonHovered(true)} onMouseLeave={() => setIsComparisonHovered(false)} onClick={() => ActivateExpCategory("Comparison")}>
                  <img className={`Exp-Main-Category-Img2 ${IsComparisonHovered ? "hovered" : ""} ${ExpCategory_ComparisonClicked ? "hovered" : ""}`} src={ComparisonImg} alt="" />
                  <img className={`Exp-Main-Category-Img3 size-changes ${IsComparisonHovered ? "hovered" : ""} ${ExpCategory_ComparisonClicked ? "hovered" : ""}`} src={ComparisonBlueImg} alt="" />
                </div>
                <p className={`text-category ${IsComparisonHovered ? "hovered" : ""} ${ExpCategory_ComparisonClicked ? "hovered" : ""}`}>Comparison</p>
              </div>

              <div className="Main-Effects">
                <div className={`circle-outer ${IsMainEffectsHovered ? "hovered" : ""} ${ExpCategory_MainEffectsClicked ? "clicked" : ""}`}></div>
                <div className={`circle ${ExpCategory_MainEffectsClicked ? "hovered" : ""}`} onMouseEnter={() => setIsMainEffectsHovered(true)} onMouseLeave={() => setIsMainEffectsHovered(false)} onClick={() => ActivateExpCategory("Main-Effects")}>
                  <img className={`Exp-Main-Category-Img2 ${IsMainEffectsHovered ? "hovered" : ""} ${ExpCategory_MainEffectsClicked ? "hovered" : ""}`} src={MainEffectsImg} alt="" />
                  <img className={`Exp-Main-Category-Img3 size-changes ${IsMainEffectsHovered ? "hovered" : ""} ${ExpCategory_MainEffectsClicked ? "hovered" : ""}`} src={MainEffectsBlueImg} alt="" />
                </div>
                <p className={`text-category ${IsMainEffectsHovered ? "hovered" : ""} ${ExpCategory_MainEffectsClicked ? "hovered" : ""}`}>Main Effects</p>
              </div>

              <div className="Data-Quality">
                <div className={`circle-outer ${IsDataQualityHovered ? "hovered" : ""} ${ExpCategory_DataQualityClicked ? "clicked" : ""}`}></div>
                <div className={`circle ${ExpCategory_DataQualityClicked ? "hovered" : ""}`} onMouseEnter={() => setIsDataQualityHovered(true)} onMouseLeave={() => setIsDataQualityHovered(false)} onClick={() => ActivateExpCategory("Data-Quality")}>
                  <img className={`Exp-Main-Category-Img2 ${IsDataQualityHovered ? "hovered" : ""} ${ExpCategory_DataQualityClicked ? "hovered" : ""}`} src={DataQualityImg} alt="" />
                  <img className={`Exp-Main-Category-Img3 size-changes ${IsDataQualityHovered ? "hovered" : ""} ${ExpCategory_DataQualityClicked ? "hovered" : ""}`} src={DataQualityBlueImg} alt="" />
                </div>
                <p className={`text-category ${IsDataQualityHovered ? "hovered" : ""} ${ExpCategory_DataQualityClicked ? "hovered" : ""}`}>Data Quality</p>
              </div>

            </div>
          </div>
        </div>

        {/*************************************************  Experiment Main Categoryies Container End *****************************************************/}

        {/*************************************************  Main Content *****************************************************/}
        <div className={`main-content-container ${isGotoExperimentClicked ? "GoToExp" : ""}`}>
          <div className="content-topbar">
            <div className="Welcome-message">
              <p className={`${isGotoProjectClicked ? "d-no" : ""}`}>Welcome to GrepBio</p>
              <p className={`Project-Text-Container ${isGotoProjectClicked ? "" : "d-no"}`}> <span className="Project-Text" onClick={handleGoBackToExptsPage}>{SelectedProjectTitle}</span>
                <span className={`${isGotoExperimentClicked ? "" : "d-no"}`} style={{ marginLeft: ".5em", marginRight: ".5em" }}>
                  <img className="Right-Arrow-Header" src={Right_Arrow_Header} alt="" />
                </span>
                <span className={`SelectedExpTitle ${isGotoExperimentClicked ? "" : "d-no"}`}>
                  {SelectedExpTitle}
                </span>
              </p>
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

          {/* ************************************************** Content MiddleBar Inside Experiment Page ************************************************** */}

          <div className={`content-middlebar-gotoexp ${isGotoExperimentClicked ? "transform" : ""}`}>
            <div className="Exp-SubCategory-Container">
              <div className="Exp-SubCategory">
                <div className={`SubCategory-Container ${ExpCategory_ExpSetupClicked ? "" : "d-no"}`}>
                  <div className={`Exp-SubCategory-list ${QualitySummaryClicked ? "clicked" : ""}`} onClick={() => ActivateExp_SubCategory("QualitySummary")}>
                    <p>Quality Summary</p>
                  </div>
                  <div className={`Exp-SubCategory-list ${MetadataClicked ? "clicked" : ""}`} onClick={() => ActivateExp_SubCategory("Metadata")}>
                    <p>Metadata</p>
                  </div>
                  <div className="line-ExpSubCategory-ExpSetup"></div>
                </div>

                <div className={`SubCategory-Container ${ExpCategory_SamplesClicked ? "" : "d-no"}`}>
                  <div className={`Exp-SubCategory-list ${CountsNormalisationClicked ? "clicked" : ""}`} onClick={() => ActivateExp_SubCategory("Counts_Normalisation")}>
                    <p>Counts Normalisation</p>
                  </div>
                  <div className={`Exp-SubCategory-list ${CorrelationHeatmapClicked ? "clicked" : ""}`} onClick={() => ActivateExp_SubCategory("Correlation_Heatmap")}>
                    <p>Correlation Heatmap</p>
                  </div>
                  <div className={`Exp-SubCategory-list ${PCAClicked ? "clicked" : ""}`} onClick={() => ActivateExp_SubCategory("PCA")}>
                    <p>PCA</p>
                  </div>
                  <div className={`Exp-SubCategory-list ${SampleSetClicked ? "clicked" : ""}`} onClick={() => ActivateExp_SubCategory("Sample_Set")}>
                    <p>Sample Set</p>
                  </div>
                  <div className="line-ExpSubCategory-Samples"></div>
                </div>

              </div>

              {/* <div className="line-ExpSubCategory"></div> */}

              <div className="Back-DeleteExp-Container">
                <div className="BackToProjectsPage" onClick={handleGoBackToExptsPage} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <img className={`BackArrow-img ${IsHovered ? "hovered" : ""}`} src={LeftArrow} alt="" />
                  <img className={`BackArrow-img2 ${IsHovered ? "hovered" : ""}`} src={LeftArrow} alt="" />
                </div>
                <div className="Delete-Exp-ExpPage" onClick={() => handleDeleteExp_Popup()}>
                  <img className="Delete-Img-ExpPage" src={Delete} alt="" />
                  <p>Delete Experiment</p>
                </div>
              </div>
            </div>

            <div className="Exp-VisualRep-Container">

              {/* ******************************************************* QualitySummaryClicked ****************************************************/}

              <div className={`container ${QualitySummaryClicked ? "clicked" : ""} ${EditQCClicked ? "noscroll" : ""} ${NotesQCClicked ? "" : "noscroll"}`}>

                <div className={`Notes-Container ${NotesQCClicked ? "clicked" : ""}`}>
                  <div className="Note-Header-Container">
                    <div className="Notes">
                      <p>Information about Visual Representation</p>
                    </div>
                    <div className="line-Notes"></div>
                  </div>
                  <div className="Notes-Content-Container">
                    <ExpSetup_QualitySummary_Notes />
                  </div>
                </div>

                <div className={`Comp ${NotesQCClicked ? "" : "setMargin"}`} style={{height:"100%"}}>
                  <ExpSetup_QualitySummary_Comp />
                </div>




                {/* ******************************************************* Notes ****************************************************/}
                <div className="Notes-Btn" onClick={() => handleNotesClick("QC")}>
                  <p className={`${NotesQCClicked ? "" : "d-no"}`}>Hide Notes</p>
                  <p className={`${NotesQCClicked ? "d-no" : ""}`}>Show Notes</p>
                </div>


                {/* ******************************************************* Notes ****************************************************/}

                {/* ******************************************************* Edit ****************************************************/}

                <div className="Edit-Analysis-Btn" onClick={() => handleEditClick("QC")}>
                  <p>Edit Analysis</p>
                </div>
                <div className={`Edit-Container ${EditQCClicked ? "clicked" : ""}`}>
                  <div className="Edit-Header-Container" >
                    <div className="Edit-Analysis">
                      <p>Edit Analysis</p>
                    </div>
                    <div className="line-Edit-Analysis"></div>
                    <div className="Close-EditContainer" onClick={() => handleEditClick("QC")}>
                      <img className="FrontArrow-img" src={LeftArrow} alt="" />
                    </div>
                  </div>
                  <div className="Edit-Content-Container">
                    <ExpSetup_QualitySummary_Control_Comp />
                  </div>
                </div>

                {/* ******************************************************* Edit ****************************************************/}
              </div>

              {/* ******************************************************* QualitySummaryClicked ****************************************************/}

              {/* ******************************************************* MetadataClicked ****************************************************/}

              <div className={`container ${MetadataClicked ? "clicked" : ""}`}>

                <div className={`Notes-Container ${NotesMetadataClicked ? "clicked" : ""}`}>
                  <div className="Note-Header-Container">
                    <div className="Notes">
                      <p>Information about Visual Representation</p>
                    </div>
                    <div className="line-Notes"></div>
                  </div>
                  <div className="Notes-Content-Container">
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus nulla eligendi assumenda, veritatis odio quaerat possimus
                      itaque provident non molestias sequi veniam voluptatum at explicabo cum similique nesciunt. Ad, quaerat facere? Aut sunt enim ea maxime dolores
                      facilis harum autem adipisci, placeat aliquam quae aliquid. Vero sequi soluta iure voluptates quis veritatis necessitatibus obcaecati cumque quas aspernatur
                      autem vel amet, error enim placeat. Itaque laudantium explicabo a similique, dolorum inventore totam? Praesentium a maxime harum tempore aperiam itaque! Quia
                      voluptate recusandae sapiente, atque autem ullam commodi ex sunt est. Repellat nihil unde, sequi in accusantium alias asperiores ullam provident ducimus.</p>
                  </div>
                </div>

                <div className={`Comp ${NotesMetadataClicked ? "" : "setMargin"}`}>

                  <Table
                    dataTable={MetadataTabledata}
                    entriesOptions={entriesOptions}
                    //highlightedColumns={highlightedColumns}
                    //highlightedColors={highlightedColors}
                    width={"100%"}
                    height={"320px"}
                    maxHeight={"700px"}
                    filterDisplay={true}
                    sortingDisplay={true}
                    displayFooter={true}
                    rowHeight={rowHeight}
                    colHeaderColor={"#BD4BBB"}
                    filterColor={"#eabdef"}
                    resultName={"Samples"}
                    tableFontSize={tableFontSize}
                    colWidth={`${200 * TableColHeaderLength_Metadata}`}
                    showCheckBox={true}

                  //paddingLeftRight={paddingLeftRight}
                  />
                </div>

                {/* ******************************************************* Notes ****************************************************/}
                <div className="Notes-Btn-Alternate" onClick={() => handleNotesClick("Metadata")}>
                  <p className={`${NotesMetadataClicked ? "" : "d-no"}`}>Hide Notes</p>
                  <p className={`${NotesMetadataClicked ? "d-no" : ""}`}>Show Notes</p>
                </div>


                {/* ******************************************************* Notes ****************************************************/}

              </div>

              {/* ******************************************************* MetadataClicked ****************************************************/}

              {/* ******************************************************* CountsNormalisationClicked ****************************************************/}

              <div className={`container ${CountsNormalisationClicked ? "clicked" : ""} ${EditCountsNormalisationClicked ? "noscroll" : ""} ${NotesCountsNormalisationClicked ? "" : "noscroll"}`}>

                <div className={`Notes-Container ${NotesCountsNormalisationClicked ? "clicked" : ""}`}>
                  <div className="Note-Header-Container">
                    <div className="Notes">
                      <p>Information about Visual Representation</p>
                    </div>
                    <div className="line-Notes"></div>
                  </div>
                  <div className="Notes-Content-Container">
                    <p>Counts Normlaisation Notes</p>
                  </div>
                </div>

                <div className={`Comp ${NotesCountsNormalisationClicked ? "" : "setMargin"}`}>
                  <Samples_CountsNormalisation_Comp />
                </div>



                {/* ******************************************************* Notes ****************************************************/}
                <div className="Notes-Btn" onClick={() => handleNotesClick("Counts_Normalisation")}>
                  <p className={`${NotesCountsNormalisationClicked ? "" : "d-no"}`}>Hide Notes</p>
                  <p className={`${NotesCountsNormalisationClicked ? "d-no" : ""}`}>Show Notes</p>
                </div>


                {/* ******************************************************* Notes ****************************************************/}

                {/* ******************************************************* Edit ****************************************************/}

                <div className="Edit-Analysis-Btn" onClick={() => handleEditClick("Counts_Normalisation")}>
                  <p>Edit Analysis</p>
                </div>
                <div className={`Edit-Container ${EditCountsNormalisationClicked ? "clicked" : ""}`}>
                  <div className="Edit-Header-Container" >
                    <div className="Edit-Analysis">
                      <p>Edit Analysis</p>
                    </div>
                    <div className="line-Edit-Analysis"></div>
                    <div className="Close-EditContainer" onClick={() => handleEditClick("Counts_Normalisation")}>
                      <img className="FrontArrow-img" src={LeftArrow} alt="" />
                    </div>
                  </div>
                  <div className="Edit-Content-Container">
                    <Samples_CountsNormalisation_Control_Comp />
                  </div>
                </div>

                {/* ******************************************************* Edit ****************************************************/}

              </div>

              {/* ******************************************************* CountsNormalisationClicked ****************************************************/}

            </div>


          </div>

          {/* ************************************************** Content MiddleBar Inside Experiment Page ************************************************** */}

          {/* ************************************************** Content MiddleBar Experiment Page ************************************************** */}

          <div className={`content-middlebar-exp ${isGotoProjectClicked ? "transform" : ""} ${isGotoExperimentClicked ? "d-no" : ""}`}>

            {/* *********************************************************** Experiment Type Container ***************************************************/}

            <div className="Exp-Type-Container">
              <div className="Exp-Type">
                <div className={`Exp-Type-Check ${BulkRNASelected ? "checked" : ""}`} onClick={() => ActivateExpType("Bulk RNAseq")}>
                  <div className={`gray-circle ${BulkRNASelected ? "d-no" : ""}`}></div>
                  <div className={`${BulkRNASelected ? "" : "d-no"}`}>
                    <img className="ExpTypeCheckImg" src={ExpTypeCheck} alt="" />
                  </div>
                  <p>Bulk RNAseq</p>
                </div>

                <div className={`Exp-Type-Check ${SingleCellSelected ? "checked" : ""}`} onClick={() => ActivateExpType("SingleCell RNAseq")}>
                  <div className={`gray-circle ${SingleCellSelected ? "d-no" : ""}`}></div>
                  <div className={`${SingleCellSelected ? "" : "d-no"}`}>
                    <img className="ExpTypeCheckImg" src={ExpTypeCheck} alt="" />
                  </div>
                  <p>SingleCell RNAseq</p>
                </div>

                <div className={`Exp-Type-Check ${MetagenomicsSelected ? "checked" : ""}`} onClick={() => ActivateExpType("Metagenomics")}>
                  <div className={`gray-circle ${MetagenomicsSelected ? "d-no" : ""}`}></div>
                  <div className={`${MetagenomicsSelected ? "" : "d-no"}`}>
                    <img className="ExpTypeCheckImg" src={ExpTypeCheck} alt="" />
                  </div>
                  <p>Metagenomics</p>
                </div>

                <div className={`Exp-Type-Check ${ProteomicsSelected ? "checked" : ""}`} onClick={() => ActivateExpType("Proteomics")}>
                  <div className={`gray-circle ${ProteomicsSelected ? "d-no" : ""}`}></div>
                  <div className={`${ProteomicsSelected ? "" : "d-no"}`}>
                    <img className="ExpTypeCheckImg" src={ExpTypeCheck} alt="" />
                  </div>
                  <p>Proteomics</p>
                </div>

                <div className={`Exp-Type-Check ${WholeGenomeSelected ? "checked" : ""}`} onClick={() => ActivateExpType("Whole GenomeSeq")}>
                  <div className={`gray-circle ${WholeGenomeSelected ? "d-no" : ""}`}></div>
                  <div className={`${WholeGenomeSelected ? "" : "d-no"}`}>
                    <img className="ExpTypeCheckImg" src={ExpTypeCheck} alt="" />
                  </div>
                  <p>Whole GenomeSeq</p>
                </div>

              </div>

              <div className="line-ExpType"></div>

              <div className="Back-DeleteProj-Container">
                <div className="BackToExptsPage" onClick={handleGoBackToProjectsPage} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                  <img className={`BackArrow-img ${IsHovered ? "hovered" : ""}`} src={LeftArrow} alt="" />
                  <img className={`BackArrow-img2 ${IsHovered ? "hovered" : ""}`} src={LeftArrow} alt="" />
                </div>
                <div className="Delete-Proj-ExpPage" onClick={() => handleDeleteProject_Popup("GlobalProj")}>
                  <img className="Delete-Img-ExpPage" src={Delete} alt="" />
                  <p>Delete Project</p>
                </div>
              </div>
            </div>

            {/* *********************************************************** Experiment Type Container End ***************************************************/}


            <div className="Experiments-List-Container">
              <div className={`${EmptyExpCount ? "d-no" : ""}`}>
                <div className="NoExp-Container">
                  <p className="">It looks like you don't have an experiment for this project. Start by creating one!</p>
                </div>
              </div>
              <div className="">
                <div className="containerExp">
                  <div className="NewExperiment-Container">
                    <div className="NewExp-Icon">
                      <div className="Dotted-Circle">
                        <div className="Inner-Dark-Circle">
                          <div className="Outer-Circle">
                            <div className="Inner-Circle">
                              <img className="Add-Img" src={AddImg} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="CreateExp-Content">
                      <div className="title">Create Experiment</div>
                      <div className="content">
                        <p>Create an experiment under this project</p>
                        <p style={{ marginTop: ".5em" }}>for analysis!</p>
                      </div>
                      <div className="create">
                        <p>Create</p>
                      </div>
                    </div>
                  </div>

                  {totalExperiments > 0 ? (
                    Array.from({ length: totalExperiments }, (_, i) => {
                      const formatDescription = (description) => {
                        if (!description) return ["", ""]; // Handle undefined description
                        if (description.length <= 50) {
                          return [
                            description.slice(0, 35),
                            description.slice(35)
                          ];
                        }
                        return [
                          description.slice(0, 35),
                          `${description.slice(35, 50)}...`
                        ];
                      };

                      const formattedDescription = formatDescription(experimentsDesc[i]);

                      return (
                        <div className="Experiment-Container" key={i}>
                          <div className="Exp-Icon">
                            <div className="Dotted-Circle">
                              <div className="Inner-Dark-Circle">
                                <div className="Outer-Circle">
                                  <div className="Inner-Circle">
                                    <img className="Exp-Img" src={ExpImg} alt="" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="CreateExp-Content">
                            <div className="title">{experimentsName[i]}</div>
                            <div className="content">
                              <p className="Exp-Description">
                                <span>{formattedDescription[0]}</span>
                                <br />
                                <span>{formattedDescription[1]}</span>
                              </p>
                            </div>
                            <div className="GotoExperiment" onClick={() => handleGotoExperiment(i)}>
                              <p>Go to Experiment</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ************************************************** Content MiddleBar Experiment Page End ************************************************** */}

          {/* ************************************************** Content MiddleBar Project Page  ************************************************** */}
          <div className={`your-projects ${isGotoProjectClicked ? "transform" : ""}`}>
            <p className="text-proj">Your Projects</p>
            <div className="line"></div>
            <div className="filter-newProj">
              <div className={`filter-img-container ${isFilterActivated ? "activated" : ""}`} onClick={() => OnFilterClick()}>
                <img className="filter-img" src={Filter} alt="" />
              </div>
              <div className="New-Project-Btn" onClick={() => NewProjectClick()}>
                <img className="Add-img" src={Add} alt="" />
                <p className="text">New Project</p>
              </div>
            </div>
          </div>

          <div className={`content-middlebar ${isGotoProjectClicked ? "transform" : ""}`}>
            <div className="your-projects-container">
              <div className={`your-projects-list ${isFilterActivated ? "activated" : ""}`} ref={containerRef}>

                {/*************************************************  Filter *****************************************************/}

                <div className="filter-box">
                  <div className="filter-box-top">
                    <p className="filter-name">Filters</p>
                    <div className="filter-line">

                    </div>
                    <p className="reset-filter">Reset Filters</p>
                  </div>
                  <div className="date-order-owner">
                    <div className="filter-date">
                      <p className="filter-text">Date</p>
                      <div className="filter-scroll">

                      </div>
                    </div>
                    <div className="filter-order">
                      <p className="filter-text">Order</p>
                      <div className="filter-scroll">

                      </div>
                    </div>
                    <div className="filter-owner">
                      <p className="filter-text">Owner</p>
                      <div className="filter-scroll">

                      </div>
                    </div>
                  </div>
                </div>

                {/*************************************************  Filter end *****************************************************/}


                {/*************************************************  Project Box *****************************************************/}

                {Array.from({ length: totalProjects }, (_, i) => (
                  <div className="project-box" key={i} onClick={() => handleProjectBoxClick(i)}>
                    <div className="project-img">
                      <img className="proj-icon-img" src={Project_Icon_Image} alt="" />
                    </div>
                    <div className="project-content">
                      <div className="projectName-description">
                        <div className="flex ai-c jc-sb">
                          <p className="proj-name">{projectsName[i]}</p>
                          <div className="flex ai-c">
                            <div className="GoToProjBtn" onClick={() => handleGotoProject(i)}>
                              <p className="">Go to Project</p>
                            </div>
                            <div className="delete-container" onClick={() => handleDeleteProject_Popup(i)}>
                              <img className="Delete-Img" src={Delete} alt="" />
                              <img className="Delete-Img-Red" src={Delete_Red} alt="" />
                            </div>
                          </div>
                        </div>
                        <p className="proj-desc">{projectsDesc[i]}</p>
                      </div>
                      <div className="project-details">
                        <div className="owner-expno">
                          <div className="Owner-Name">
                            <p>Owner : &nbsp;</p>
                            <p className="projects-values">{userfullName}</p>
                          </div>
                          <div className="ExpNo">
                            <p>No of Experiments :&nbsp;</p>
                            <p className="projects-values">{getExperimentsCount(i)}</p>
                          </div>
                        </div>
                        <div className="creation-lastModified">
                          <div className="creation-date">
                            <p>Creation Date :&nbsp;</p>
                            <p className="projects-values">{CreatedON[i]}</p>
                          </div>
                          <div className="last-modified-date">
                            <p>Last Modified Date : &nbsp;</p>
                            <p className="projects-values">{LastModifiedON[i]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/*************************************************  Project Box End *****************************************************/}

              </div>

              <div className="Copyrights-Container">
                <p>GrepBio &copy; 2024</p>
              </div>
            </div>

            {/*************************************************  Project Information  *****************************************************/}

            <div className="project-information-container">
              <div className="project-information">
                <div className="project-information-content">
                  <div className="project-information-title">
                    <p className="text">Project Information</p>
                    <div className="line-Proj-Info"></div>
                  </div>
                  <div className="project-information-inside">
                    <div className={`No-ProjectCard-Selected-container ${ProjectBoxClick ? "d-no" : ""}`}>
                      <div className="No-ProjectCard-Selected">
                        <p className="text">Please select a project to view</p>
                        <p className="text">it's information !</p>
                      </div>
                    </div>
                    <div className={`${ProjectBoxClick ? "" : "d-no"}`} style={{ height: "100%" }}>
                      <div className="ProjectCard-Selected">
                        <div className="">
                          <div className="ProjectCard-Name">
                            <p className="text">Name : &nbsp;</p>
                            <input className="input" type="text" value={ProjNameForInfo} readOnly />
                            <img className="EditImg" src={Edit} alt="" />
                          </div>

                          <div className="ProjectCard-Desc">
                            <p className="text">Descr : &nbsp;</p>
                            <textarea className="textarea" type="text" value={ProjDescForInfo} readOnly />
                            <img className="EditImgDesc" src={Edit} alt="" />
                          </div>

                          <div className="ProjectCard-Owner">
                            <p className="text">Owner : &nbsp;</p>
                            <input className="input disable" type="text" value={OwnerName} readOnly />
                          </div>

                          <div className="ProjectCard-CreatedON">
                            <p className="text">Created : &nbsp;</p>
                            <input className="input disable" type="text" value={ProjCreatedForInfo} readOnly />
                          </div>

                          <div className="ProjectCard-LastModified">
                            <p className="text">Modified : &nbsp;</p>
                            <input className="input disable" type="text" value={ProjModifiedForInfo} readOnly />
                          </div>

                        </div>

                        <div className="ProjectCard-Exp">
                          <Table
                            dataTable={Tabledata}
                            highlightedColumns={highlightedColumns}
                            highlightedColors={highlightedColors}
                            width={tableWidth}
                            height={tableHeight}
                            maxHeight={maxHeight}
                            filterDisplay={false}
                            sortingDisplay={true}
                            displayFooter={false}
                            rowHeight={rowHeight}
                            colHeaderColor={colHeaderColor}
                            entriesOptions={entriesOptions}
                            resultName={resultName}
                            tableFontSize={tableFontSize}
                            paddingLeftRight={paddingLeftRight}
                            //filterColor={filterColor}
                            //colWidth = {`${200*TableColHeaderLength_Metadata}`}
                            showCheckBox={false}
                          />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*************************************************  Activity Feed end *****************************************************/}

          </div>

          {/* ************************************************** Content MiddleBar Project Page End ************************************************** */}

        </div>
      </div>
    </div>
  )
}

export default Projects_Page;