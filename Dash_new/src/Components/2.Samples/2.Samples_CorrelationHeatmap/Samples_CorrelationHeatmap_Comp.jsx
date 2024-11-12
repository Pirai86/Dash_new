import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import "../../../Styles/Samples_CountsNormalisation_Comp.css";
import ImagePlot from "../../ImagePlot";
import { GlobalContext } from "../../Global";
import InfoImg from "../../../assets/info.png";
import InfoClose from "../../../assets/infoClose.png";

import {
  CorrelationHeatmap_Info,
  CorrelationDend_Info,
} from "../../../ImageInfo/CorrelationHeatmap_Info";

function Samples_CorrelationHeatmap_Comp() {

  const { Samples_CorrelationHeatmap_DendData } = useContext(GlobalContext);
  const { Samples_CorrelationHeatmap_Data } = useContext(GlobalContext);

  const [InfoCorrelationHeatmapClicked, setInfoCorrelationHeatmapClicked] = useState(false);
  const [InfoCorrelationDendClicked, setInfoCorrelationDendClicked] = useState(false);

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

  const updatedConfig = {
    ...((Samples_CorrelationHeatmap_Data || {})),
    layout: {
      ...((Samples_CorrelationHeatmap_Data && Samples_CorrelationHeatmap_Data.layout) || {}),
      width: 790,
      height: 650,
      xaxis: {
        ...((Samples_CorrelationHeatmap_Data && Samples_CorrelationHeatmap_Data.layout?.xaxis) || {}),
        tickangle: 310,
        tickfont: {
          size: 12,
        },
      },
      yaxis: {
        ...((Samples_CorrelationHeatmap_Data && Samples_CorrelationHeatmap_Data.layout?.yaxis) || {}),
        tickfont: {
          size: 12,
        },
      },

    },
  };

  const handleInfoCorrelationHeatmapClick = (Action) => {
    setInfoCorrelationHeatmapClicked(false);

    switch (Action) {
      case "Open":
        setInfoCorrelationHeatmapClicked(true);
        break;
      case "Close":
        setInfoCorrelationHeatmapClicked(false);
        break;
      default:
        break;
    }
  }

  const handleInfoCorrelationDendClick = (Action) => {
    setInfoCorrelationDendClicked(false);

    switch (Action) {
      case "Open":
        setInfoCorrelationDendClicked(true);
        break;
      case "Close":
        setInfoCorrelationDendClicked(false);
        break;
      default:
        break;
    }
  }


  return (
    <>
      <div className="flex ai-c jc-sb" style={{ width: "100%" }}>

        <div className="background-white" style={{ position: "relative" }}>
          {Samples_CorrelationHeatmap_Data && (
            <div className="custom-modebar">
              <Plot
                data={updatedConfig.data}
                layout={updatedConfig.layout}
                style={{ width: "100%", height: "100%" }}
                config={config}
              />
            </div>
          )}

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoCorrelationHeatmapClick("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container ${InfoCorrelationHeatmapClicked ? "clicked" : ""}`}>
            <div className="">
              <CorrelationHeatmap_Info />
            </div>
          </div>
          <div className={`Top-Space-100 ${InfoCorrelationHeatmapClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoCorrelationHeatmapClicked ? "" : "d-no"}`} onClick={() => handleInfoCorrelationHeatmapClick("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>

        </div>


        <div className="background-white" style={{ position: "relative", height: "100%" }}>
          {Samples_CorrelationHeatmap_DendData && <ImagePlot />}

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoCorrelationDendClick("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container ${InfoCorrelationDendClicked ? "clicked" : ""}`}>
            <div className="">
              <CorrelationDend_Info />
            </div>
          </div>
          <div className={`Top-Space-100 ${InfoCorrelationDendClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoCorrelationDendClicked ? "" : "d-no"}`} onClick={() => handleInfoCorrelationDendClick("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>
        </div>

      </div>
    </>
  );
}

export default Samples_CorrelationHeatmap_Comp;
