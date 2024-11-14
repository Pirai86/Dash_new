import React, { useState, useEffect, useContext } from "react";
import Plot from "react-plotly.js";
import ReactSelect, { createFilter } from "react-select";
//import "../../../Styles/Expression_GeneExpression_Comp.css";
import axios from 'axios';
import Expression_GeneExpression_Option_Comp from "./Expression_GeneExpression_Option_Comp";
import Expression_GeneExpression_MenuList_Comp from "./Expression_GeneExpression_MenuList_Comp";
import makeAnimated from "react-select/animated";
import { GlobalContext } from "../../Global";
import { useNavigate } from "react-router-dom";

import InfoImg from "../../../assets/info.png";
import InfoClose from "../../../assets/infoClose.png";

import CountNormalisationRaw_Info from "../../../ImageInfo/CountNormalisationRaw_Info";

const animatedComponents = makeAnimated();
const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Expression_GeneExpression_Comp = ({ selectedGene, selectedFactor }) => {
  const { Expression_GeneExpression_GeneNames, Expression_GeneExpression_CategoryNames, jwt, globalExperimentID } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [selectedGenes, setSelectedGenes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [plotData, setPlotData] = useState({});
  const [cache, setCache] = useState({});

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
      'filename': 'Gene_Expression',
      'height': 680,
      'width': 270,
      'scale': 1 // Multiply title/legend/axis/canvas sizes by this factor
    }
  };

  useEffect(() => {
    if (selectedGene && selectedFactor) {
      fetchPlotData(selectedGene, selectedFactor, true);
    } else if (selectedGenes.length > 0 && selectedCategory) {
      selectedGenes.forEach(gene => {
        const cacheKey = `${gene.value}-${selectedCategory}`;
        if (cache[cacheKey]) {
          setPlotData(prevData => ({ ...prevData, [cacheKey]: cache[cacheKey] }));
        } else {
          fetchPlotData(gene.value, selectedCategory);
        }
      });
    }
  }, [selectedGene, selectedFactor, selectedGenes, selectedCategory]);

  useEffect(() => {
    // Set default gene and category if not already selected
    if (!selectedGene && !selectedFactor && Expression_GeneExpression_GeneNames.length > 0 && Expression_GeneExpression_CategoryNames.length > 0) {
      const defaultGene = Expression_GeneExpression_GeneNames[0];
      const defaultCategory = Expression_GeneExpression_CategoryNames[0];
      setSelectedGenes([{ value: defaultGene, label: defaultGene }]);
      setSelectedCategory(defaultCategory);

      fetchPlotData(defaultGene, defaultCategory);
    }
  }, [Expression_GeneExpression_GeneNames, Expression_GeneExpression_CategoryNames]);

  const fetchPlotData = async (gene, category, isSingleGene = false) => {
    if (!gene || !category) {
      //console.error("Invalid gene or category");
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_API_URL}expression/gene_expression?expt_id=${globalExperimentID}&gene=${gene}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            accept: 'application/json'
          }
        });
      const cacheKey = `${gene}-${category}`;
      setCache(prevCache => ({ ...prevCache, [cacheKey]: response.data.plot_data }));
      setPlotData(prevData => ({ ...prevData, [cacheKey]: response.data.plot_data }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        //console.log('Unauthorized access - possible invalid token');
        navigate("/");
      }
    }
  };

  const handleGeneSelectChange = (selectedOptions) => {
    setSelectedGenes(selectedOptions || []);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : null);
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


  const renderPlots = () => {
    if (selectedGene && selectedFactor) {
      const cacheKey = `${selectedGene}-${selectedFactor}`;
      return (
        <div key={cacheKey} className="custom-modebar" style={{ padding: "20px" }}>
          <Plot
            config={config}
            data={plotData[cacheKey] || []}
            layout={{
              title: `${selectedGene}`,
              yaxis: {
                title: "Log2 (normalised counts)",
                showgrid: true,
                gridcolor: 'rgb(255, 255, 255)',
                gridwidth: 2,
              },
              paper_bgcolor: '#f7fafe',
              plot_bgcolor: '#f7fafe',
              showlegend: false,
              margin: {
                l: 60,
                r: 20,
                b: 50,
                t: 40
              },
              width: 230,
              height: 280,
              xaxis: {
                showticklabels: false, // This removes the x-axis text values
              },
            }}
          />
        </div>
      );
    }

    return selectedGenes.map((gene) => {
      const cacheKey = `${gene.value}-${selectedCategory}`;
      return (
        <div key={cacheKey} className="background-white" style={{ position: "relative", backgroundColor: "#f7fafe", marginTop: "2em" }}>
          <div className="custom-modebar" key={gene.value}>
            <Plot
              config={config}
              data={plotData[cacheKey] || []}
              layout={{
                title: `${gene.label}`,
                yaxis: {
                  title: "Log2 (normalised counts)",
                  showgrid: true,
                  gridcolor: 'rgb(255, 255, 255)',
                  gridwidth: 2,
                },
                paper_bgcolor: '#f7fafe',
                plot_bgcolor: '#f7fafe',
                showlegend: false,
                margin: {
                  l: 60,
                  r: 20,
                  b: 250,
                  t: 40
                },
                width: 230,
                height: 600,
                xaxis: {
                  tickangle: 90,
                }
              }}
            />
          </div>

          {/* <div className={`InfoImg-Container-Samples`} onClick={() => handleExpressionHeatmapInfoClick("Open")}>
            <img className="InfoImg" src={InfoImg} alt="" />
          </div>

          <div className={`Info-Container ${InfoExpressionHeatmapClicked ? "clicked" : ""}`}>
            <div className="">
              <CountNormalisationRaw_Info />
            </div>
          </div>
          <div className={`Top-Space-100 ${InfoExpressionHeatmapClicked ? "clicked" : ""}`}>

          </div>
          <div className={`Info-Close-Btn-Samples ${InfoExpressionHeatmapClicked ? "" : "d-no"}`} onClick={() => handleExpressionHeatmapInfoClick("Close")}>
            <img className="InfoCloseImg" src={InfoClose} alt="" />
          </div> */}

        </div>
      );
    });
  };

  return (
    <div>

      {!selectedGene && !selectedFactor && (
        <>
          <div className="" style={{ padding: "0px 25px" }}>
            <div className="ImageInfo_Style" style={{ padding: "10px" }}>
              <p className="Heading" style={{ color: "black", fontSize: "14px", fontWeight: "bold" }}>Select Genes</p>
            </div>

            <br />
            <ReactSelect
              filterOption={createFilter({ ignoreAccents: false })}
              captureMenuScroll={false}
              closeMenuOnSelect={true}
              components={{
                ...animatedComponents,
                Option: Expression_GeneExpression_Option_Comp,
                MenuList: Expression_GeneExpression_MenuList_Comp,
              }}
              isMulti
              options={Expression_GeneExpression_GeneNames.map((gene) => ({ value: gene, label: gene }))}
              value={selectedGenes}
              onChange={handleGeneSelectChange}
              classNamePrefix="custom-select"
            />

            <br />
            <div className="Category-Selection">
              <ReactSelect
                filterOption={createFilter({ ignoreAccents: false })}
                options={Expression_GeneExpression_CategoryNames.map((category) => ({
                  value: category,
                  label: category,
                }))}
                value={
                  selectedCategory
                    ? { value: selectedCategory, label: selectedCategory }
                    : null
                }
                onChange={handleCategoryChange}
                classNamePrefix="custom-select"
              />
            </div>
          </div>

        </>
      )}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginTop: "1em",
        position: "relative",
      }}>
        {renderPlots()}

        <div className={`InfoImg-Container-Samples`} onClick={() => handleExpressionHeatmapInfoClick("Open")}>
          <img className="InfoImg" src={InfoImg} alt="" />
        </div>

        <div className={`Info-Container ${InfoExpressionHeatmapClicked ? "clicked" : ""}`}>
          <div className="">
            <CountNormalisationRaw_Info />
          </div>
        </div>
        <div className={`Top-Space-100 ${InfoExpressionHeatmapClicked ? "clicked" : ""}`}>

        </div>
        <div className={`Info-Close-Btn-Samples ${InfoExpressionHeatmapClicked ? "" : "d-no"}`} onClick={() => handleExpressionHeatmapInfoClick("Close")}>
          <img className="InfoCloseImg" src={InfoClose} alt="" />
        </div>

      </div>
    </div>
  );
};

export default Expression_GeneExpression_Comp;
