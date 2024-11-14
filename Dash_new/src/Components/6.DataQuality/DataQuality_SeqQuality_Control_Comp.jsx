import React, { useState, useEffect, useContext } from "react";
import MultiSelect from "../MultiSelect";
import "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Container, Row } from "react-bootstrap";
//import "../../Styles/DataQuality_SeqQuality_Comp.css";
import { GlobalContext } from "../Global";


const DataQuality_SeqQuality_Control_Comp = () => {

  const {mappedSamples,globalfastqscreen, globalfeaturecounts, globalstaralignment, globalrsemmapping} = useContext(GlobalContext);

    const [optionSelectedRows, setSelectedRows] = useState(globalfeaturecounts.categories);
  
  const { setDataQuality_SeqQuality_MeanQualityScores
   } = useContext(GlobalContext);
  const {DataQuality_SeqQuality_MeanQualityScoresCopy} = useContext(GlobalContext);
  const {DataQuality_SeqQuality_Mean_ycats} = useContext(GlobalContext);
  const { setDataQuality_SeqQuality_GcContent } = useContext(GlobalContext);
  const {DataQuality_SeqQuality_GcContentCopy} = useContext(GlobalContext);
  const { setDataQuality_SeqQuality_lengthData,
          setDataQuality_SeqQuality_FastqScreenCategories,
          setDataQuality_SeqQuality_FastqScreenSeries,
          setDataQuality_SeqQuality_RsemMappingCategories,
          setDataQuality_SeqQuality_RsemMappingSeries,
          setDataQuality_SeqQuality_StarAlignmentCategories,
          setDataQuality_SeqQuality_StarAlignmentSeries,
          setDataQuality_SeqQuality_FeatureCountsCategories, 
          setDataQuality_SeqQuality_FeatureCountsSeries } = useContext(GlobalContext);
  const {DataQuality_SeqQuality_lengthDataCopy} = useContext(GlobalContext);

  const handleRowChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    updateSeries(selectedRows);
  };

  const mapSelectedRows = (selectedRows) => {
    const selectedSampleNames = selectedRows.map(
      (row) => mappedSamples[row.label] || row.label
    );
    return Array.from(new Set(selectedSampleNames)); // Remove duplicates
  };

  const filterRows = (filteredData, selectedRows) => {
    return filteredData.filter((item) =>
      selectedRows.map((selectedItem) => selectedItem.label).includes(item.name)
    );
  };

  const updateSeries = (selectedRows) => {
    let filteredmeanqualityscores = DataQuality_SeqQuality_MeanQualityScoresCopy;
    let filteredgcContent = DataQuality_SeqQuality_GcContentCopy;
    let filteredlengthData = DataQuality_SeqQuality_lengthDataCopy;
    if (selectedRows) {
      filteredmeanqualityscores = filterRows(filteredmeanqualityscores, selectedRows);
      filteredgcContent = filterRows(filteredgcContent, selectedRows);
      filteredlengthData = filterRows(filteredlengthData, selectedRows);
    }
    setDataQuality_SeqQuality_MeanQualityScores(filteredmeanqualityscores);
    setDataQuality_SeqQuality_GcContent(filteredgcContent);
    setDataQuality_SeqQuality_lengthData(filteredlengthData);

    // Update stacked bar graph data
    const updateStackedBarGraphData = (data, categories, selectedRows) => {
      if (selectedRows && selectedRows.length > 0) {
        const selectedSampleNames = mapSelectedRows(selectedRows);
        const selectedIndices = categories.reduce((acc, category, index) => {
          if (selectedSampleNames.includes(category)) acc.push(index);
          return acc;
        }, []);

        return {
          filteredSeries: data.series.map((dataset) => ({
            ...dataset,
            data: selectedIndices.map((i) => dataset.data[i]),
          })),
          filteredCategories: selectedSampleNames,
        };
      }
      return { filteredSeries: data.series, filteredCategories: categories };
    };

    const { filteredSeries: updatedFeatureCountsSeries, filteredCategories: updatedFeatureCountsCategories } = updateStackedBarGraphData(
      globalfeaturecounts,
      globalfeaturecounts.categories,
      selectedRows
    );
    setDataQuality_SeqQuality_FeatureCountsSeries(updatedFeatureCountsSeries);
    setDataQuality_SeqQuality_FeatureCountsCategories(updatedFeatureCountsCategories);

    const { filteredSeries: updatedStarAlignmentSeries, filteredCategories: updatedStarAlignmentCategories } = updateStackedBarGraphData(
      globalstaralignment,
      globalstaralignment.categories,
      selectedRows
    );
    setDataQuality_SeqQuality_StarAlignmentSeries(updatedStarAlignmentSeries);
    setDataQuality_SeqQuality_StarAlignmentCategories(updatedStarAlignmentCategories);

    const { filteredSeries: updatedRsemMappingSeries, filteredCategories: updatedRsemMappingCategories } = updateStackedBarGraphData(
      globalrsemmapping,
      globalrsemmapping.categories,
      selectedRows
    );
    setDataQuality_SeqQuality_RsemMappingSeries(updatedRsemMappingSeries);
    setDataQuality_SeqQuality_RsemMappingCategories(updatedRsemMappingCategories);

    // Filter fastqscreen data based on selected samples
    let filteredFastqScreenSeries = globalfastqscreen.series;
    let filteredFastqScreenCategories = globalfastqscreen.categories;

    if (selectedRows && selectedRows.length > 0) {
      const selectedSampleNames = selectedRows.map((row) => row.label);
      const selectedIndices = globalfastqscreen.categories.reduce((acc, category, index) => {
        if (selectedSampleNames.includes(category)) {
          acc.push(index);
        }
        return acc;
      }, []);

      filteredFastqScreenCategories = selectedSampleNames;
      filteredFastqScreenSeries = globalfastqscreen.series.map((dataset) => ({
        ...dataset,
        data: selectedIndices.map((i) => dataset.data[i]),
      }));
    }

    setDataQuality_SeqQuality_FastqScreenSeries(filteredFastqScreenSeries);
    setDataQuality_SeqQuality_FastqScreenCategories(filteredFastqScreenCategories);
  };

  return (
    <Container fluid="md" style={{ marginTop: "1em" }}>
      <Row>
        <MultiSelect
          key="example_id"
          options={DataQuality_SeqQuality_Mean_ycats}
          onChange={handleRowChange}
          value={optionSelectedRows}
          isSelectAll={true}
          menuPlacement={"bottom"}
        />
      </Row>
    </Container>
  );
};

export default DataQuality_SeqQuality_Control_Comp;

