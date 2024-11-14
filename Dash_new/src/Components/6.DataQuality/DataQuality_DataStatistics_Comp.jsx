// import React, { useContext, useState, useEffect, useRef } from "react";
// import { AgGridReact } from "ag-grid-react";
// import BarCellRenderer from '../Common/BarCellRenderer.jsx';
// import CustomFilter from '../Common/CustomFilter.jsx';
// import SortableHeaderComponent from '../Common/SortableHeaderComponent.jsx';
// import { GlobalContext } from "../Global.jsx";
// import "../../Styles/DataQuality_DataStatistics_Comp.css";

// const containerStyle = { width: '100%', height: '100%' };

// const defaultColDef = {
//     resizable: true,
//     sortable: true,
//     filter: true,
//     headerComponent: SortableHeaderComponent,
//     headerComponentParams: {
//         menuIcon: 'fa-bars'
//     },
//     editable: false,
//     width: 120,
//     wrapHeaderText: true,
//     autoHeaderHeight: true,
//     floatingFilter: true,
//     flex: 1
// };

// const getBackground = (params) => {
//     let background;
//     var groupid = params.data.group_id;

//     // Some Logic to style your components

//     if (groupid === 0) {
//         background = "#dee8fa";
//     } else if (groupid === 1) {
//         background = "#fadab9";
//     } else if (groupid === 2) {
//         background = "#d2fad3";
//     } else if (groupid === 3) {
//         background = "#f7cfc6";
//     } else if (groupid === 4) {
//         background = "#e1d7fa";
//     } else if (groupid === 5) {
//         background = "#fae7cd";
//     } else if (groupid === 6) {
//         background = "#fad7f2";
//     } else if (groupid === 7) {
//         background = "#e6e1e1";
//     } else if (groupid === 8) {
//         background = "#f7f7c6";
//     } else if (groupid === 9) {
//         background = "#e3feff";
//     }
//     return {
//         background: background
//     };
// }

// function DataQuality_DataStatistics_Comp() {
//     const { DataQuality_DataStatistics_Data } = useContext(GlobalContext);
//     const [quickFilterText, setQuickFilterText] = useState(null);
//     const [rowCount, setRowCount] = useState(null);
//     const gridRef = useRef();

//     useEffect(() => {
//         calculateRowCount();
//     }, [DataQuality_DataStatistics_Data]);

//     const onGridReady = () => {
//         gridRef.current.api.sizeColumnsToFit();
//     };

//     const onBtnExport = () => {
//         const gridApi = gridRef.current.api;
//         gridApi.exportDataAsCsv({ onlySelectedAllPages: true });
//     };

//     const onCellClicked = (event) => {

//     };

//     const onRowSelected = (event) => {

//     };

//     const onQuickFilterText = (event) => {
//         setQuickFilterText(event.target.value);
//     };

//     const calculateRowCount = () => {
//         if (DataQuality_DataStatistics_Data) {
//             setRowCount(DataQuality_DataStatistics_Data.length);
//         }
//     };

//     const columnDefs = [
//         {
//             headerName: "",
//             width: 40,
//             checkboxSelection: true,
//             sortable: false,
//             suppressMenu: true,
//             filter: false,
//             pinned: true,
//             headerCheckboxSelection: true
//         },
//         {
//             headerName: "Sample Information",
//             children: [
//                 {
//                     headerName: "Sample name",
//                     field: "sample_name",
//                     pinned: true,
//                     cellStyle: getBackground,
//                     wrapText: true,
//                     autoHeight: true,
//                     width: 170
//                 },

//                 {
//                     headerName: "Group",
//                     field: "group",
//                     pinned: true,
//                     cellStyle: getBackground,
//                     wrapText: true,
//                     autoHeight: true,
//                     width: 170
//                 }
//             ]
//         },
//         {
//             headerName: "Sequencing quality",
//             children: [
//                 {
//                     headerName: "Reads sequenced (M)",
//                     field: "n_reads_seq",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 5, maxlevel: 20, reverseColors: true },
//                     filter: CustomFilter,
//                     filterParams: { minlevel: 5, maxlevel: 20 },
//                 }, {
//                     headerName: "Average base quality score",
//                     field: "avg_base_quality_score",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 20, maxlevel: 30, reverseColors: true },
//                     filter: CustomFilter,
//                     filterParams: { minlevel: 20, maxlevel: 30 },
//                 }, {
//                     headerName: "% GC content",
//                     field: "pct_gc_content",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 35, maxlevel: 40, reverseColors: true },
//                     filter: CustomFilter,
//                     filterParams: { minlevel: 35, maxlevel: 40 },
//                 }, {
//                     headerName: "% Alignable reads",
//                     field: "pct_alignable",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 50, maxlevel: 80, reverseColors: true },
//                     filter: CustomFilter,
//                     filterParams: { minlevel: 50, maxlevel: 80 },
//                 }
//             ]
//         }, {
//             headerName: "Alignment quality",
//             children: [
//                 {
//                     headerName: "Uniquely aligned reads (M)",
//                     field: "n_reads_aligned",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 5, maxlevel: 10, reverseColors: true },
//                     filter: CustomFilter,
//                     filterParams: { minlevel: 5, maxlevel: 10 },
//                 }, {
//                     headerName: "Percent uniquely aligned reads",
//                     field: "pct_aligned",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 50, maxlevel: 80, reverseColors: true },
//                     filter: CustomFilter,
//                     filterParams: { minlevel: 50, maxlevel: 80 },
//                 }
//             ]
//         }
//     ];

//     return (
//         <div style={containerStyle}>
//             <div className="Note-Style" style={{ marginBottom: "1em" }}>
//                 <p>
//                     Summary statistics for the filtered reads are tabulated and colour coded based on whether they meet the recommended limits
//                     (green: pass, yellow: warning, red: fail).
//                 </p>

//             </div>
//             <br />
//             <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                 <div style={{ display: "inline-block", width: "100%", float: "left", marginBottom: 20 }}>
//                     <div className="flex">
//                         <p style={{ color: "#0578A6", letterSpacing: "1.25px", fontWeight: "600" }}>Number of samples:&nbsp;</p>
//                         <p>{rowCount}</p>
//                     </div>
//                     <div className="flexClass" style={{ float: "right", marginLeft: 20, fontSize: "14px" }}>
//                         <label htmlFor="quickFilter" style={{ padding: "0px", letterSpacing: "1.2px" }}>Quick Filter:&nbsp;</label>
//                         <input style={{ height: "25px", width: "235px" }} type="text" id="quickFilter" onChange={onQuickFilterText} />
//                         <p className="ExportBtnStyle" style={{ marginLeft: 20 }} onClick={onBtnExport}>Export CSV</p>
//                     </div>
//                 </div>

//                 <div style={{ height: '48em', width: '100%' }} className="ag-theme-alpine">
//                     <AgGridReact
//                         // listening for events
//                         onGridReady={onGridReady}
//                         onRowSelected={onRowSelected}
//                         onCellClicked={onCellClicked}

//                         // binding to simple properties
//                         quickFilterText={quickFilterText}

//                         // column definitions
//                         columnDefs={columnDefs}

//                         // binding to array properties
//                         rowData={DataQuality_DataStatistics_Data} // Here, use DataQuality_DataStatistics_Data from context

//                         // no binding, just providing hard coded strings for the properties
//                         // boolean properties will default to true if provided (ie suppressRowClickSelection => suppressRowClickSelection="true")
//                         rowSelection="multiple"
//                         groupHeaders

//                         // setting default column properties
//                         defaultColDef={defaultColDef}
//                         rowMultiSelectWithClick={true}
//                         pagination={true}

//                         // Assigning reference to the grid
//                         ref={gridRef}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DataQuality_DataStatistics_Comp;
