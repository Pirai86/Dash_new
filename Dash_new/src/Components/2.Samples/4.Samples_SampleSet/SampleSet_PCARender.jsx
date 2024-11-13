import React, { useContext, useState } from 'react';
import { GlobalContext } from "../../Global";
import Plot from "react-plotly.js";

function SampleSet_PCARender() {

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
          'filename': 'SampleSet_PCA_Final',
          'height': 1080,
          'width': 1920,
          'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
        }
      };

    const { Samples_SampleSet_PCAImg } = useContext(GlobalContext);

    return (

        <div className="">
            {Samples_SampleSet_PCAImg && (
                <>
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
                                width: 1000, // Set width as per your requirement
                                height: 420, // Set height as per your requirement
                                margin: { l: 0, r: 0, t: 0, b: 0 }, // Remove margins (left, right, top, bottom)
                                images: [
                                    {
                                        source: Samples_SampleSet_PCAImg,
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
                    </div></>
            )}
        </div>

    );
}

export default SampleSet_PCARender;