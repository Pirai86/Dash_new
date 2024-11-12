import SampleSet_PCARender from "./SampleSet_PCARender";
import SampleSet_BoxPlot from "./SampleSet_BoxPlot";
import SampleSet_ClusteringRender from "./SampleSet_ClusteringRender";
import SampleSet_Dend from "./SampleSet_Dend";

import InfoImg from "../../../assets/info.png";
import InfoClose from "../../../assets/infoClose.png";

import CountNormalisationNormalised_Info from "../../../ImageInfo/CountNormalisationNormalised_Info";
import { CorrelationHeatmap_Info, CorrelationDend_Info } from "../../../ImageInfo/CorrelationHeatmap_Info";
import { PCA_Info } from "../../../ImageInfo/PCA_Info";

import React, { useState } from "react";

const Samples_SampleSet_Comp = () => {

  const [InfoBoxPlotClicked, setInfoBoxPlotClicked] = useState(false);
  const [InfoClusterClicked, setInfoClusterClicked] = useState(false);
  const [InfoDendClicked, setInfoDendClicked] = useState(false);
  const [InfoPCARenderClicked, setInfoPCARenderClicked] = useState(false);

  const handleInfoBoxPlotClicked = (Action) => {
    setInfoBoxPlotClicked(false);

    switch (Action) {
      case "Open":
        setInfoBoxPlotClicked(true);
        break;
      case "Close":
        setInfoBoxPlotClicked(false);
        break;
      default:
        break;
    }
  }

  const handleInfoClusterClicked = (Action) => {
    setInfoClusterClicked(false);

    switch (Action) {
      case "Open":
        setInfoClusterClicked(true);
        break;
      case "Close":
        setInfoClusterClicked(false);
        break;
      default:
        break;
    }
  }

  const handleInfoDendClicked = (Action) => {
    setInfoDendClicked(false);

    switch (Action) {
      case "Open":
        setInfoDendClicked(true);
        break;
      case "Close":
        setInfoDendClicked(false);
        break;
      default:
        break;
    }
  }

  const handleInfoPCARenderClicked = (Action) => {
    setInfoPCARenderClicked(false);

    switch (Action) {
      case "Open":
        setInfoPCARenderClicked(true);
        break;
      case "Close":
        setInfoPCARenderClicked(false);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="SampleSetOne">
        <div className="background-white" style={{ position: "relative" }}>
          <SampleSet_BoxPlot />

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoBoxPlotClicked("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container ${InfoBoxPlotClicked ? "clicked" : ""}`}>
            <div className="">
              <CountNormalisationNormalised_Info/>
            </div>
          </div>
          <div className={`Top-Space-50 ${InfoBoxPlotClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoBoxPlotClicked ? "" : "d-no"}`} onClick={() => handleInfoBoxPlotClicked("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>
        </div>



        <div className="background-white" style={{ marginLeft: "2em", position: "relative" }}>
          <SampleSet_ClusteringRender />

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoClusterClicked("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container-50 ${InfoClusterClicked ? "clicked" : ""}`}>
            <div className="">
              <CorrelationHeatmap_Info/>
            </div>
          </div>
          <div className={`Top-Space-50 ${InfoClusterClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoClusterClicked ? "" : "d-no"}`} onClick={() => handleInfoClusterClicked("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>

        </div>


      </div>

      <div className="SampleSetTwo">
        <div className="background-white" style={{ position: "relative" }}>
          <SampleSet_Dend />

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoDendClicked("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container ${InfoDendClicked ? "clicked" : ""}`}>
            <div className="">
              <CorrelationDend_Info/>
            </div>
          </div>
          <div className={`Top-Space-100 ${InfoDendClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoDendClicked ? "" : "d-no"}`} onClick={() => handleInfoDendClicked("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>

        </div>
        <div className="background-white" style={{ marginLeft: "2em", position: "relative" }}>
          <SampleSet_PCARender />

          <div className={`InfoImg-Container-Samples`} onClick={() => handleInfoPCARenderClicked("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container-75 ${InfoPCARenderClicked ? "clicked" : ""}`}>
            <div className="">
              <PCA_Info/>
            </div>
          </div>
          <div className={`Top-Space ${InfoPCARenderClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoPCARenderClicked ? "" : "d-no"}`} onClick={() => handleInfoPCARenderClicked("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div>

        </div>
      </div>
    </>
  );
};

export default Samples_SampleSet_Comp;
