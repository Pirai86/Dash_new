import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import { GlobalContext } from "../../Global";
import { useNavigate } from "react-router-dom";
//import "../../../Styles/Samples_PCA_Comp.css";
import InfoImg from "../../../assets/info.png";
import InfoClose from "../../../assets/infoClose.png";

import { PCA_Info, PCA_Boxplot_Info } from "../../../ImageInfo/PCA_Info";

import {
  CorrelationHeatmap_Info,
  CorrelationDend_Info,
} from "../../../ImageInfo/CorrelationHeatmap_Info";

function Samples_PCA_Comp() {
  const [PCtestData, setPCtestData] = useState(null);
  const [pcsData, setpcsData] = useState(null);
  const plotRef = useRef(null);

  const [InfoPCAClicked, setInfoPCAClicked] = useState(false);
  const [InfoPCABoxPlotClicked, setInfoPCABoxPlotClicked] = useState(false);

  const navigate = useNavigate();

  const {
    Samples_PCA_CorrectionChoice,
    Samples_PCA_GeneChoice,
    Samples_PCA_GroupChoice,
    Samples_PCA_PlotTypeChoice,
    jwt,
    globalExperimentID,
  } = useContext(GlobalContext);

  const { isGotoExperimentClicked, setisPCAEmpty } = useContext(GlobalContext);


  const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

  const config = {
    displaylogo: false,
    modeBarButtonsToRemove: [
      "select2d",
      "lasso2d",
      "zoomIn2d",
      "zoomOut2d",
      "autoScale2d",
    ],
    'toImageButtonOptions': {
      'format': 'png',
      'filename': 'PCA',
      'height': 1080,
      'width': 1920,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  const config2 = {
    displaylogo: false,
    modeBarButtonsToRemove: [
      "select2d",
      "lasso2d",
      "zoomIn2d",
      "zoomOut2d",
      "autoScale2d",
    ],
    'toImageButtonOptions': {
      'format': 'png',
      'filename': 'PCA_Significance',
      'height': 1080,
      'width': 1920,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const cacheKey = `PCAData_${globalExperimentID}_${Samples_PCA_CorrectionChoice}_${Samples_PCA_GroupChoice}_${Samples_PCA_GeneChoice}_${Samples_PCA_PlotTypeChoice}`;
      const cachedData = localStorage.getItem(cacheKey);



      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setPCtestData(parsedData.PCtestData);
        setpcsData(parsedData.pcsData);
        if (plotRef.current) {
          plotRef.current.resizeHandler();
        }
        setisPCAEmpty(false);
        return;
      }

      try {
        const payload = {
          batch_correction: Samples_PCA_CorrectionChoice,
          category_name: Samples_PCA_GroupChoice,
          top_var_genes: parseInt(Samples_PCA_GeneChoice, 10),
          pca_plot_type: Samples_PCA_PlotTypeChoice,
        };

        const responseData = await axios.post(
          `${BACKEND_API_URL}samples/effect_of_covariates_on_PC?expt_id=${globalExperimentID}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const responseImage = await axios.post(
          `${BACKEND_API_URL}samples/similarity_pca?expt_id=${globalExperimentID}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
              Accept: "*/*",
            },
            responseType: "arraybuffer",
          }
        );

        const data = responseData.data;
        const base64Image = btoa(
          new Uint8Array(responseImage.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        const imagefile = `data:image/png;base64,${base64Image}`;

        const updatedLayout = {
          ...data.layout,
          title: "Effect of covariates on PC",
          showlegend: false,
          yaxis: {
            title: "PC co-ordinates",
            showgrid: true,
            gridcolor: "rgb(243, 243, 243)",
            gridwidth: 2,
          },
          margin: {
            l: 60,
            r: 60,
            b: 60,
            t: 80,
          },
          width: "",
          height: "",
          // margin: {
          //   l: 0,
          //   r: 0,
          //   b: 0,
          //   t: 0,
          // },

          //autosize: true,
        };

        const updatedData = data.data.map((trace) => ({
          ...trace,
          jitter: 0.5,
          pointpos: -1.8,
          boxpoints: "all",
          boxmean: true,
          whiskerwidth: 0.2,
          marker: {
            ...trace.marker,
            size: 3,
          },
          line: { width: 1 },
        }));

        const PCtestData = { data: updatedData, layout: updatedLayout };

        setPCtestData(PCtestData);
        setpcsData(imagefile);

        try {
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ PCtestData, pcsData: imagefile })
          );
        } catch (e) {
          if (e.code === 22 || e.message.includes("quota")) {
            //console.error("LocalStorage quota exceeded, consider optimizing storage.");
            localStorage.removeItem(cacheKey);
          }
        }

        if (plotRef.current) {
          plotRef.current.resizeHandler();
        }
        setisPCAEmpty(false);
      } catch (error) {
        //console.error('Error loading data:', error.message);
        setisPCAEmpty(true);
        if (error.response?.status === 404) {
          //console.log("Sample PCA data not available");
        } else if (error.response?.status === 401) {
          //console.log('Unauthorized access - possible invalid token');
          navigate("/login");
        }
      }
    };



    if (isGotoExperimentClicked) {
      loadData();
    }
  }, [
    Samples_PCA_GroupChoice,
    Samples_PCA_CorrectionChoice,
    Samples_PCA_GeneChoice,
    Samples_PCA_PlotTypeChoice
  ]);

  const handleInfoPCAClicked = (Action) => {
    setInfoPCAClicked(false);

    switch (Action) {
      case "Open":
        setInfoPCAClicked(true);
        break;
      case "Close":
        setInfoPCAClicked(false);
        break;
      default:
        break;
    }
  }

  const handleInfoPCABoxPlotClicked = (Action) => {
    setInfoPCABoxPlotClicked(false);

    switch (Action) {
      case "Open":
        setInfoPCABoxPlotClicked(true);
        break;
      case "Close":
        setInfoPCABoxPlotClicked(false);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="flex jc-c ai-c" style={{ flexDirection: "column", padding: "15px 10px" }}>
        <div className="background-white" style={{ position: "relative", width: "" }}>
          {pcsData &&
            <>
              <div className="custom-modebar" style={{ width: "100%" }}>
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
                    width: 1200, // Set width as per your requirement
                    height: 420, // Set height as per your requirement
                    margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
                    images: [
                      {
                        source: pcsData,
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
            </>
          }

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoPCAClicked("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container-50 ${InfoPCAClicked ? "clicked" : ""}`}>
            <div className="">
              <PCA_Info />
            </div>
          </div>
          <div className={`Top-Space-50 ${InfoPCAClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoPCAClicked ? "" : "d-no"}`} onClick={() => handleInfoPCAClicked("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>
        </div>

        <div className="background-white" style={{ position: "relative", marginTop: "2em" }}>
          {PCtestData && (
            <>
              <div className="custom-modebar">
                <Plot
                  config={config2}
                  ref={plotRef}
                  data={PCtestData.data}
                  layout={PCtestData.layout} // Ensure layout is passed correctly
                  useResizeHandler
                  style={{ width: "100%", height: "100%" }} />
              </div>
            </>
          )}

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoPCABoxPlotClicked("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container-50 ${InfoPCABoxPlotClicked ? "clicked" : ""}`}>
            <div className="">
              <PCA_Boxplot_Info />
            </div>
          </div>
          <div className={`Top-Space-50 ${InfoPCABoxPlotClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoPCABoxPlotClicked ? "" : "d-no"}`} onClick={() => handleInfoPCABoxPlotClicked("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>
        </div>
      </div>

    </>
  );
}

export default Samples_PCA_Comp;
