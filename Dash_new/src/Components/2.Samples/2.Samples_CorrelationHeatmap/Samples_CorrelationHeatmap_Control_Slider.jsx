import React, { useContext } from "react";
import Slider from "@mui/material/Slider";
import { GlobalContext } from "../../Global";

const Samples_CorrelationHeatmap_Control_Slider = ({ }) => {
  const { setSamples_CorrelationHeatmap_CutreedepthChoice } = useContext(GlobalContext);

  const { Samples_CorrelationHeatmap_CutreedepthChoice } = useContext(GlobalContext);

  const handleSliderChange = (event, newValue) => {
    let label;
    switch (newValue) {
      case 0.5:
        label = "0.5";
        break;
      case 0.7:
        label = "0.7";
        break;
      case 0.8:
        label = "0.8";
        break;
      case 0.9:
        label = "0.9";
        break;
      default:
        label = "0.5"; // Default value
    }
    setSamples_CorrelationHeatmap_CutreedepthChoice(label);
  };

  return (
    <div className="" style={{padding:"0px 15px"}}>
      <Slider
        value={parseFloat(Samples_CorrelationHeatmap_CutreedepthChoice)}
        step={0.1}
        min={0.5}
        max={0.9}
        onChange={handleSliderChange}
        aria-labelledby="cutreedepth-slider"
        valueLabelDisplay="auto"
        sx={{
          color: '#5156bc', // Set the color of the slider here
          '& .MuiSlider-thumb': {
            backgroundColor: '#5156bc', // Thumb color
          },
          '& .MuiSlider-track': {
            backgroundColor: '#5156bc', // Track color
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#d3d3d3', // Rail color (unfilled portion)
          },
        }}
      />
    </div>
  );
};

export default Samples_CorrelationHeatmap_Control_Slider;
