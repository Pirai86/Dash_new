import Plot from "react-plotly.js";
import { useContext, useState } from "react";
import { GlobalContext } from "../../Global";

import InfoImg from "../../../assets/info.png";
import InfoClose from "../../../assets/infoClose.png";

import ExpressionHeatmap_Info from "../../../ImageInfo/ExpressionHeatmap_Info";

function Expression_ExpressionHeatmap_Comp() {
  const { Expression_ExpressionHeatmap_Data } = useContext(GlobalContext);

  const [InfoExpressionHeatmapClicked, setInfoExpressionHeatmapClicked] = useState(false);

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
      'filename': 'Expression_Heatmap',
      'height': 1080,
      'width': 1920,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  const updatedLayout = {
    ...((Expression_ExpressionHeatmap_Data || {})),
    layout: {
      ...((Expression_ExpressionHeatmap_Data && Expression_ExpressionHeatmap_Data.layout) || {}),
      width: 675,
      height: 770,
      xaxis: {
        ...((Expression_ExpressionHeatmap_Data && Expression_ExpressionHeatmap_Data.layout?.xaxis) || {}),
        tickangle: 270,
        tickfont: {
          size: 10,
        },
      },
      yaxis: {
        ...((Expression_ExpressionHeatmap_Data && Expression_ExpressionHeatmap_Data.layout?.yaxis) || {}),
        tickfont: {
          size: 10,
        },
      },
    },
  };

  const handleExpressionHeatmapInfoClick = (Action) => {
    setInfoExpressionHeatmapClicked(false);

    switch (Action) {
      case "Open":
        setInfoExpressionHeatmapClicked(true);
        break;
      case "Close":
        setInfoExpressionHeatmapClicked(false);
        break;
      default:
        break;
    }
  }

  return (

    Expression_ExpressionHeatmap_Data && (
      <>
        <div className="flex ai-c jc-c">
          <div className="background-white" style={{ width: "49%", position: "relative" }}>
            <div className="custom-modebar" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plot
                config={config}
                data={updatedLayout.data}
                layout={updatedLayout.layout} />
            </div>

            <div className={`InfoImg-Container-Samples`} onClick={() => handleExpressionHeatmapInfoClick("Open")}>
              <img className="InfoImg" src={InfoImg} alt="" />
            </div>

            <div className={`Info-Container-75 ${InfoExpressionHeatmapClicked ? "clicked" : ""}`}>
              <div className="">
                <ExpressionHeatmap_Info />
              </div>
            </div>
            <div className={`Top-Space-75 ${InfoExpressionHeatmapClicked ? "clicked" : ""}`}>

            </div>
            <div className={`Info-Close-Btn-Samples ${InfoExpressionHeatmapClicked ? "" : "d-no"}`} onClick={() => handleExpressionHeatmapInfoClick("Close")}>
              <img className="InfoCloseImg" src={InfoClose} alt="" />
            </div>

          </div>
        </div>
      </>
    )
  );
}

export default Expression_ExpressionHeatmap_Comp;
