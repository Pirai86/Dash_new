import { useState, useContext } from "react";
import MultiSelect, { Option } from "../../../Components/MultiSelect";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import { GlobalContext } from "../../Global";


export default function ExpSetup_QualitySummary_Control_Comp() {
  const { ExpSetup_QualitySummary_xcat } = useContext(GlobalContext);
  const { ExpSetup_QualitySummary_ycat } = useContext(GlobalContext);
  const { setExpSetup_QualitySummary_Data } = useContext(GlobalContext);
  const { ExpSetup_QualitySummary_Control_Data } = useContext(GlobalContext);
  const [optionSelectedRows, setSelectedRows] = useState<Option[] | null>(null);
  const [optionSelectedCols, setSelectedCols] = useState<Option[] | null>(null);

  let master_heatmap_data = ExpSetup_QualitySummary_Control_Data;

  const handlerowChange = (selectedrows: Option[]) => {
    setSelectedRows(selectedrows);
    updateSeries(selectedrows, optionSelectedCols);
  };
  const handlecolChange = (selectedcols: Option[]) => {
    setSelectedCols(selectedcols);
    updateSeries(optionSelectedRows, selectedcols);
  };

  function filterrows(
    filteredData: { name: string; data: { x: string; y: number }[] }[],
    selectedRows: Option[]
  ) {
    filteredData = filteredData.filter((item) =>
      selectedRows.map((item: { label: any }) => item.label).includes(item.name)
    );
    return filteredData;
  }

  function filtercolumns(
    filteredData: { name: string; data: { x: string; y: number }[] }[],
    selectedColumns: Option[]
  ) {
    filteredData = filteredData.map((item) => ({
      ...item,
      data: item.data.filter((d) =>
        selectedColumns.some((fc: { label: string }) => fc.label === d.x)
      ),
    }));
    return filteredData;
  }

  const updateSeries = (
    selectedRows: Option[] | null,
    selectedColumns: Option[] | null
  ) => {
    let filteredData = master_heatmap_data;
    if (selectedRows != null)
      filteredData = filterrows(filteredData, selectedRows);
    if (selectedColumns != null)
      filteredData = filtercolumns(filteredData, selectedColumns);
    setExpSetup_QualitySummary_Data(filteredData);
  };

  return (
    <Container fluid="md" className="ReactMultiSelect-container">
      <Row>
        <Col>
          <Row style={{marginBottom:".7em"}}>
            <p className="text">Rows</p>
          </Row>
          <Row style={{marginBottom:"2em"}}>
            <MultiSelect
              key="example_id"
              options={ExpSetup_QualitySummary_ycat}
              onChange={handlerowChange}
              value={optionSelectedRows}
              isSelectAll={true}
              menuPlacement={"bottom"}
            />
          </Row>
          <Row style={{marginBottom:".7em"}}>
            <p className="text">Columns</p>
          </Row>
          <Row style={{marginBottom:"1em"}}>
            <MultiSelect
              key="example_id"
              options={ExpSetup_QualitySummary_xcat}
              onChange={handlecolChange}
              value={optionSelectedCols}
              isSelectAll={true}
              menuPlacement={"bottom"}
            />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
