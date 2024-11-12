import React from 'react';
import "../../../Styles/Samples_CountsNormalisation_Comp.css";

function Samples_CorrelationHeatmap_Radio_Comp({ options, name, onChange }) {
  return (
    <div className='Samples_CountsNormalisation_Radio_Comp'>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            value={option.value}
            name={`${name}-heatmap`} // ensure that inputs are grouped correctly by unique name
            onChange={(e) => onChange(e.target.value)}
            defaultChecked={index === 0}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default Samples_CorrelationHeatmap_Radio_Comp;
