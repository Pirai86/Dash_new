import React, { useContext } from "react";
import Samples_CorrelationHeatmap_Radio_Comp from "./Samples_CorrelationHeatmap_Radio_Comp";
import "../../../Styles/Samples_CorrelationHeatmap_Comp.css";
import Samples_CorrelationHeatmap_Control_Slider from "./Samples_CorrelationHeatmap_Control_Slider";
import { GlobalContext } from "../../Global";

function Samples_CorrelationHeatmap_Control_Comp() {
  const {
    setSamples_CorrelationHeatmap_CorrectionChoice,
    setSamples_CorrelationHeatmap_GroupChoice,
    setSamples_CorrelationHeatmap_GeneChoice,
    setSamples_CorrelationHeatmap_LinkageChoice,
    setSamples_CorrelationHeatmap_CutreedepthChoice,
  } = useContext(GlobalContext);

  return (
    <div className="Samples_BoxPlot_Control_Container">

      <p className="text">Batch correction</p>
      <Samples_CorrelationHeatmap_Radio_Comp
        name="correction"
        options={[
          { label: "Corrected", value: "corrected" },
          { label: "Uncorrected", value: "uncorrected" },
        ]}
        onChange={setSamples_CorrelationHeatmap_CorrectionChoice}
      />

      <p className="text">Annotation rows</p>
      <Samples_CorrelationHeatmap_Radio_Comp
        name="group"
        options={[
          { label: "Group", value: "group" },
          { label: "Covariates", value: "covariates" },
        ]}
        onChange={setSamples_CorrelationHeatmap_GroupChoice}
      />

      <p className="text">Top variance genes</p>
      <Samples_CorrelationHeatmap_Radio_Comp
        name="gene"
        options={[
          { label: "500", value: "500" },
          { label: "1000", value: "1000" },
        ]}
        onChange={setSamples_CorrelationHeatmap_GeneChoice}
      />

      <p className="text">Dendrogram linkage</p>
      <Samples_CorrelationHeatmap_Radio_Comp
        name="linkage"
        options={[
          { label: "Ward D2", value: "ward_D2" },
          { label: "Complete", value: "complete" },
        ]}
        onChange={setSamples_CorrelationHeatmap_LinkageChoice}
      />

      <p className="text">Dendrogram cut depth</p>
      <div className="" style={{marginTop:".5em"}}>
        <Samples_CorrelationHeatmap_Control_Slider />
      </div>

    </div>
  );
}

export default Samples_CorrelationHeatmap_Control_Comp;
