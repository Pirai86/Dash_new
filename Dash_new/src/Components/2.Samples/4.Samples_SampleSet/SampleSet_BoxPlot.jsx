import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../Global";
import Plot from "react-plotly.js";



const SampleSet_BoxPlot = () => {

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
      'filename': 'SampleSet_BoxPlot_Final',
      'height': 1080,
      'width': 1920,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  const { Samples_SampleSet_NormReadCountsImg } = useContext(GlobalContext);


  return (
    <div className="flex ai-c">
      {Samples_SampleSet_NormReadCountsImg && (

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
              width: 600, // Set width as per your requirement
              height: 450, // Set height as per your requirement
              margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
              images: [
                {
                  source: Samples_SampleSet_NormReadCountsImg,
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
            config={config}
          />
        </div>
      )}
    </div>
  );
};

export default SampleSet_BoxPlot;
