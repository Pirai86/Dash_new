import React, { useContext, useState, useEffect, useCallback, useRef } from "react";
//import { AgGridReact } from "ag-grid-react";
//import SortableHeaderComponent from "../../Common/SortableHeaderComponent.jsx";
import { GlobalContext } from "../../Global.jsx";
//import "../../../Styles/ExpSetup_MetaData_Comp.css";
// import Info_Icon from "../../../assets/Info_Icon.svg";
// import Image_Info from "../../Common/Image_Info.jsx";
// import Metadata_Info from "../../../ImageInfo/Metadata_Info.jsx";

const containerStyle = { width: "100%", height: "94%" };

// const defaultColDef = {
//   resizable: true,
//   sortable: true,
//   filter: true,
//   headerComponent: SortableHeaderComponent,
//   headerComponentParams: {
//     menuIcon: "fa-bars",
//   },
//   editable: false,
//   width: 200,
//   wrapHeaderText: true,
//   autoHeaderHeight: true,
//   floatingFilter: true,
// };

const ExpSetup_MetaData_Comp = () => {
  const gridRef = useRef();
  const { ExpSetup_Metadata_Data = [], ExpSetup_Metadata_Covariate = [] } = useContext(GlobalContext);

  const [isTableInfoVisible, setIsTableInfoVisible] = useState(false);
  const [quickFilterText, setQuickFilterText] = useState(null);
  const [rowCount, setRowCount] = useState(null);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    //console.log("ExpSetup_Metadata_Data:", ExpSetup_Metadata_Data);
    setRowData(ExpSetup_Metadata_Data || []);
    setRowCount((ExpSetup_Metadata_Data || []).length);
  }, [ExpSetup_Metadata_Data]);

  const icons = {
    columnRemoveFromGroup: '<i class="fa fa-times"/>',
    filter: '<i class="fa fa-filter"/>',
    sortAscending: '<i class="fa fa-long-arrow-down"/>',
    sortDescending: '<i class="fa fa-long-arrow-up"/>',
    groupExpanded: '<i class="fa fa-minus-square-o"/>',
    groupContracted: '<i class="fa fa-plus-square-o"/>',
  };

  const columnDefs = (ExpSetup_Metadata_Data && ExpSetup_Metadata_Data.length > 0)
    ? Object.keys(ExpSetup_Metadata_Data[0]).map((column) => ({
      headerName: column,
      field: column,
      cellStyle: (params) => ({
        backgroundColor: ExpSetup_Metadata_Covariate.includes(params.colDef.headerName)
          ? "#fdfd96"
          : "white",
      }),
      headerClass: (params) =>
        ExpSetup_Metadata_Covariate.includes(params.colDef.headerName)
          ? "yellow-header"
          : "white-header",
    }))
    : [];

  const onGridReady = useCallback((params) => {
    params.api && calculateRowCount(params.api);
  }, []);

  const calculateRowCount = useCallback(
    (api) => {
      if (api && rowData) {
        const model = api.getModel();
        const totalRows = rowData.length;
        const processedRows = model.getRowCount();
        setRowCount(
          `${processedRows.toLocaleString()} / ${totalRows.toLocaleString()}`
        );
      }
    },
    [rowData]
  );

  const onBtnExport = useCallback(() => {
    gridRef.current.api &&
      gridRef.current.api.exportDataAsCsv({ onlySelectedAllPages: false });
  }, []);

  const onCellClicked = useCallback((event) => { }, []);

  const onRowSelected = useCallback((event) => { }, []);

  const onQuickFilterText = useCallback((event) => {
    setQuickFilterText(event.target.value);
  }, []);

  const handleTableCancelIconClick = () => {
    setIsTableInfoVisible(false);
  };

  const handleTableImageInfoIconClick = () => {
    setIsTableInfoVisible(true);
  };

  useEffect(() => {
    if (rowCount === null && rowData) {
      calculateRowCount();
    }
  }, [rowCount, rowData, calculateRowCount]);

  return (
    <div className="Component-Container">
      <p>Check</p>
    </div>
    
  );
};

export default ExpSetup_MetaData_Comp;
