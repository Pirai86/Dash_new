import React, { useContext } from "react";
import { GlobalContext } from "../../Global";
import Plot from "react-plotly.js";

function SampleSet_ClusteringRender() {

  const { Samples_SampleSet_Heatmap_Data } = useContext(GlobalContext);

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
      'filename': 'SampleSet_Correlation_Heatmap_Final',
      'height': 1080,
      'width': 1920,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  const updatedConfig = {
    ...((Samples_SampleSet_Heatmap_Data || {})),
    layout: {
      ...((Samples_SampleSet_Heatmap_Data && Samples_SampleSet_Heatmap_Data.layout) || {}),
      width: 690,
      height: 550,
      xaxis: {
        ...((Samples_SampleSet_Heatmap_Data && Samples_SampleSet_Heatmap_Data.layout?.xaxis) || {}),
        tickangle: 310,
        tickfont: {
          size: 12,
        },
      },
      yaxis: {
        ...((Samples_SampleSet_Heatmap_Data && Samples_SampleSet_Heatmap_Data.layout?.yaxis) || {}),
        tickfont: {
          size: 12,
        },
      },
      margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
    },
  };

  return (

    <div className="">
      {Samples_SampleSet_Heatmap_Data && (
        <div className="custom-modebar">
          <Plot
            data={updatedConfig.data}
            layout={updatedConfig.layout}
            style={{ width: "100%", height: "100%" }}
            config={config}
          />
        </div>
      )}
    </div>

  );
}

export default SampleSet_ClusteringRender;
