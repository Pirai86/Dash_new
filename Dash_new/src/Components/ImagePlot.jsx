import React, { useContext } from "react";
import Plot from "react-plotly.js";
import { GlobalContext } from "./Global";

const ImagePlot = () => {
  const { Samples_CorrelationHeatmap_DendData } = useContext(GlobalContext);

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
      'filename': 'Samples_Dendrogram',
      'height': 1080,
      'width': 1920,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  return (
    <div className="custom-modebar">
      <Plot
        config={config2}
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
          width: 525, // Set width as per your requirement
          height: 525, // Set height as per your requirement
          margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
          images: [
            {
              source: Samples_CorrelationHeatmap_DendData,
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
      />
    </div>
  );
};

export default ImagePlot;
