import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { Container, Row, Col } from "react-bootstrap";
import { GlobalContext } from "../../Global";
import "../../../Styles/Samples_CountsNormalisation_Comp.css";
import InfoImg from "../../../assets/info.png";
import QualitySummary_Info from "../../../ImageInfo/QualitySummary_Info";
import InfoClose from "../../../assets/infoClose.png";

import CountNormalisationNormalised_Info from "../../../ImageInfo/CountNormalisationNormalised_Info";
import CountNormalisationRaw_Info from "../../../ImageInfo/CountNormalisationRaw_Info";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const cache = {};

const Samples_CountsNormalisation_Comp = ({ ActivateMetadata_ExpSetup }) => {
  const [rawReadCounts, setRawReadCounts] = useState(null);
  const [normReadCounts, setNormReadCounts] = useState(null);
  const [InfoRawClicked, setInfoRawClicked] = useState(false);
  const [InfoNormClicked, setInfoNormClicked] = useState(false);

  const { Samples_CountsNormalisation_Control_DataSelection, jwt, setisCountsNormalisationEmpty, globalExperimentID } =
    useContext(GlobalContext);

  const config = {
    displaylogo: false,
    modeBarButtonsToRemove: [
      "select2d",
      "lasso2d",
      "zoomIn2d",
      "zoomOut2d",
      "autoScale2d",
    ], // List of buttons to remover
  };

  useEffect(() => {
    const loadData = async () => {

      const cacheKeyRaw = `raw-${Samples_CountsNormalisation_Control_DataSelection}-${globalExperimentID}`;
      const cacheKeyNorm = `norm-${Samples_CountsNormalisation_Control_DataSelection}-${globalExperimentID}`;

      if (cache[cacheKeyRaw] && cache[cacheKeyNorm]) {
        //console.log("Using cached data");
        setRawReadCounts(cache[cacheKeyRaw]);
        setNormReadCounts(cache[cacheKeyNorm]);
        setisCountsNormalisationEmpty(false);

      } else {
        //console.log("Fetching data from backend");
        try {
          const rawResponse = await axios.get(
            `${BACKEND_API_URL}samples/samplewise_raw_count?expt_id=${globalExperimentID}&category=${Samples_CountsNormalisation_Control_DataSelection}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
              responseType: 'blob'
            }
          );

          const normResponse = await axios.get(
            `${BACKEND_API_URL}samples/samplewise_normalised_count?expt_id=${globalExperimentID}&category=${Samples_CountsNormalisation_Control_DataSelection}`,
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
              responseType: 'blob'
            }
          );

          const rawImageUrl = URL.createObjectURL(rawResponse.data);
          const normImageUrl = URL.createObjectURL(normResponse.data);

          setRawReadCounts(rawImageUrl);
          setNormReadCounts(normImageUrl);

          cache[cacheKeyRaw] = rawImageUrl;
          cache[cacheKeyNorm] = normImageUrl;

          setisCountsNormalisationEmpty(false);

        } catch (error) {

          setisCountsNormalisationEmpty(true);
          if (error.response.status === 401) {
            //console.log('Unauthorized access - possible invalid token');
            navigate("/login");
          } else if (error.response.status === 404) {
            //console.log('Data not found');
            setisCountsNormalisationEmpty(true);
          }
        }
      }
    };

    if (Samples_CountsNormalisation_Control_DataSelection) {
      loadData();
    }
  }, [Samples_CountsNormalisation_Control_DataSelection, jwt, globalExperimentID, setisCountsNormalisationEmpty]);

  const handleRawInfoClick = (Action) => {
    setInfoRawClicked(false);

    switch (Action) {
      case "Open":
        setInfoRawClicked(true);
        break;
      case "Close":
        setInfoRawClicked(false);
        break;
      default:
        break;
    }
  }

  const handleNormInfoClick = (Action) => {
    setInfoNormClicked(false);

    switch (Action) {
      case "Open":
        setInfoNormClicked(true);
        break;
      case "Close":
        setInfoNormClicked(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className="Component-Container">
      <Container fluid style={{ height: "auto" }}>
        <Row style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
          <Col style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {rawReadCounts && (
              <>
                <div className="background-white" style={{ position: "relative" }}>
                  <div className="custom-modebar">
                    <Plot
                      data={[
                        {
                          type: "scatter",
                          x: [0, 1],
                          y: [0, 1],
                          mode: "markers",
                          marker: { opacity: 0 }, // Hide markers
                        },
                      ]}
                      layout={{
                        width: 425, // Set width as per your requirement
                        height: 400, // Set height as per your requirement
                        margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
                        images: [
                          {
                            source: rawReadCounts,
                            xref: "x",
                            yref: "y",
                            x: 0,
                            y: 5,
                            sizex: 1,
                            sizey: 5,
                            sizing: "fit",
                            opacity: 1,
                            layer: "above",
                          },
                        ],
                        xaxis: { range: [0, 1], visible: false }, // Adjust range as per your requirement
                        yaxis: { range: [0, 5], visible: false }, // Adjust range as per your requirement
                      }}
                      config={config} />
                  </div>

                  <div className={`InfoImg-Container-Samples`} onClick={() => handleRawInfoClick("Open")}>
                    <img className="InfoImg" src={InfoImg} alt="" />
                  </div>

                  <div className={`Info-Container ${InfoRawClicked ? "clicked" : ""}`}>
                    <div className="">
                      <CountNormalisationRaw_Info />
                    </div>
                  </div>
                  <div className={`Top-Space-100 ${InfoRawClicked ? "clicked" : ""}`}>

                  </div>
                  <div className={`Info-Close-Btn-Samples ${InfoRawClicked ? "" : "d-no"}`} onClick={() => handleRawInfoClick("Close")}>
                    <img className="InfoCloseImg" src={InfoClose} alt="" />
                  </div>
                </div>
              </>
            )}
          </Col>
          <Col className="" style={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {normReadCounts && (
              <>
                <div className="background-white" style={{ position: "relative" }}>
                  <div className="custom-modebar">
                    <Plot
                      data={[
                        {
                          type: "scatter",
                          x: [0, 1],
                          y: [0, 1],
                          mode: "markers",
                          marker: { opacity: 0 }, // Hide markers
                        },
                      ]}
                      layout={{
                        width: 425, // Set width as per your requirement
                        height: 400, // Set height as per your requirement
                        margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
                        images: [
                          {
                            source: normReadCounts,
                            xref: "x",
                            yref: "y",
                            x: 0,
                            y: 5,
                            sizex: 1,
                            sizey: 5,
                            sizing: "fit",
                            opacity: 1,
                            layer: "above",
                          },
                        ],
                        xaxis: { range: [0, 1], visible: false }, // Adjust range as per your requirement
                        yaxis: { range: [0, 5], visible: false }, // Adjust range as per your requirement
                      }}
                      config={config} />
                  </div>
                  <div className={`InfoImg-Container-Samples`} onClick={() => handleNormInfoClick("Open")}>
                    <img className="InfoImg" src={InfoImg} alt="" />
                  </div>

                  <div className={`Info-Container ${InfoNormClicked ? "clicked" : ""}`}>
                    <div className="">
                      <CountNormalisationNormalised_Info />
                    </div>
                  </div>
                  <div className={`Top-Space-100 ${InfoNormClicked ? "clicked" : ""}`}>

                  </div>
                  <div className={`Info-Close-Btn-Samples ${InfoNormClicked ? "" : "d-no"}`} onClick={() => handleNormInfoClick("Close")}>
                    <img className="InfoCloseImg" src={InfoClose} alt="" />
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Samples_CountsNormalisation_Comp;
