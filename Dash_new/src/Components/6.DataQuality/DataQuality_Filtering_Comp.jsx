// import React, { useContext, useState, useEffect, useRef } from "react";
// import { AgGridReact } from "ag-grid-react";
// import BarCellRenderer from '../Common/BarCellRenderer.jsx';
// import CustomFilter from '../Common/CustomFilter.jsx';
// //import SortableHeaderComponent from '../Common/SortableHeaderComponent.jsx';
// import { GlobalContext } from "../Global.jsx";
// //import "../../Styles/DataQuality_Filtering_Comp.css";

// const containerStyle = { width: '100%', height: '100%' };

// // const defaultColDef = {
// //     resizable: true,
// //     sortable: true,
// //     filter: true,
// //     headerComponent: SortableHeaderComponent,
// //     headerComponentParams: {
// //         menuIcon: 'fa-bars'
// //     },
// //     editable: false,
// //     width: 120,
// //     wrapHeaderText: true,
// //     autoHeaderHeight: true,
// //     floatingFilter: true,
// //     flex: 1
// // };

// // const getBackground = (params) => {
// //     let background;
// //     var groupid = params.data.group_id;

// //     // Logic to style your components
// //     if (groupid === 0) {
// //         background = "#dee8fa";
// //     } else if (groupid === 1) {
// //         background = "#fadab9";
// //     } else if (groupid === 2) {
// //         background = "#d2fad3";
// //     } else if (groupid === 3) {
// //         background = "#f7cfc6";
// //     } else if (groupid === 4) {
// //         background = "#e1d7fa";
// //     } else if (groupid === 5) {
// //         background = "#fae7cd";
// //     } else if (groupid === 6) {
// //         background = "#fad7f2";
// //     } else if (groupid === 7) {
// //         background = "#e6e1e1";
// //     } else if (groupid === 8) {
// //         background = "#f7f7c6";
// //     } else if (groupid === 9) {
// //         background = "#e3feff";
// //     }
// //     return {
// //         background: background
// //     };
// // };

// const DataQuality_Filtering_Comp = () => {
//     var { DataQuality_Filtering_Data } = useContext(GlobalContext);

//     const [quickFilterText, setQuickFilterText] = useState(null);
//     var [rowData, setRowData] = useState(DataQuality_Filtering_Data);
//     rowData = DataQuality_Filtering_Data;
//     var [rowCount, setRowCount] = useState(null);
//     rowCount = rowData.length;
//     const gridRef = useRef();

//     const icons = {
//         columnRemoveFromGroup: '<i class="fa fa-times"/>',
//         filter: '<i class="fa fa-filter"/>',
//         sortAscending: '<i class="fa fa-long-arrow-down"/>',
//         sortDescending: '<i class="fa fa-long-arrow-up"/>',
//         groupExpanded: '<i class="fa fa-minus-square-o"/>',
//         groupContracted: '<i class="fa fa-plus-square-o"/>'
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
//                     field: "name",
//                     pinned: true,
//                     cellStyle: getBackground,
//                     wrapText: true,
//                     autoHeight: true,
//                     width: 140
//                 },
//                 {
//                     headerName: "Group",
//                     field: "group",
//                     pinned: true,
//                     cellStyle: getBackground,
//                     wrapText: true,
//                     autoHeight: true,
//                     width: 140
//                 }
//             ]
//         },
//         {
//             headerName: "Over Representation / Adapter contamination",
//             children: [
//                 {
//                     headerName: "Sequence",
//                     field: "seq",
//                     cellClass: "regular-text" // Apply regular text style
//                 },
//                 {
//                     headerName: "Reads sequenced (K)",
//                     field: "n_reads_seq",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 25, maxlevel: 1000, reverseColors: false },
//                     filter: CustomFilter, // Updated to use CustomFilter
//                     filterParams: { title: 'Custom Bar Filter', minlevel: 25, maxlevel: 1000 },
//                     cellClass: "regular-text" // Apply regular text style
//                 },
//                 {
//                     headerName: "% Reads",
//                     field: "pct_reads",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 0.1, maxlevel: 3, scalefactor: 10, reverseColors: false },
//                     filter: CustomFilter, // Updated to use CustomFilter
//                     filterParams: { title: 'Custom Bar Filter', minlevel: 0.1, maxlevel: 3 },
//                     cellClass: "regular-text" // Apply regular text style
//                 },
//                 {
//                     headerName: "Length distribution",
//                     field: "len_dist",
//                     cellClass: "regular-text" // Apply regular text style
//                 },
//                 {
//                     headerName: "Possible source",
//                     field: "source",
//                     wrapText: true,
//                     autoHeight: true,
//                     width: 250,
//                     cellClass: "regular-text" // Apply regular text style
//                 }
//             ]
//         },
//         {
//             headerName: "Trimming",
//             children: [
//                 {
//                     headerName: "% Reads trimmed",
//                     field: "pct_reads_trimmed",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 0.1, maxlevel: 3, scalefactor: 10, reverseColors: false },
//                     filter: CustomFilter, // Updated to use CustomFilter
//                     filterParams: { title: 'Custom Bar Filter', minlevel: 0.1, maxlevel: 3 },
//                     cellClass: "regular-text" // Apply regular text style
//                 },
//                 {
//                     headerName: "% Basepairs trimmed",
//                     field: "pct_bp_trimmed",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 0.1, maxlevel: 3, scalefactor: 10, reverseColors: false },
//                     filter: CustomFilter, // Updated to use CustomFilter
//                     filterParams: { title: 'Custom Bar Filter', minlevel: 0.1, maxlevel: 3 },
//                     cellClass: "regular-text" // Apply regular text style
//                 },
//                 {
//                     headerName: "% Reads removed (length <20bp)",
//                     field: "pct_reads_removed",
//                     cellRenderer: BarCellRenderer,
//                     cellRendererParams: { minlevel: 0.1, maxlevel: 3, scalefactor: 10, reverseColors: false },
//                     filter: CustomFilter, // Updated to use CustomFilter
//                     filterParams: { title: 'Custom Bar Filter', minlevel: 0.1, maxlevel: 3 },
//                     cellClass: "regular-text" // Apply regular text style
//                 }
//             ]
//         }

//     ];

//     const onGridReady = () => {
//         gridRef.current.api.sizeColumnsToFit();
//         calculateRowCount(gridRef.current.api);
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

//     const calculateRowCount = (api) => {
//         if (api && rowData) {
//             const model = api.getModel();
//             const totalRows = rowData.length;
//             const processedRows = model.getRowCount();
//             setRowCount(processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString());
//         }
//     };

//     return (
//         <>
//             <div className="Note-Style" style={{ marginBottom: "1em" }}>
//                 <p>
//                     We detected the following overrepresented sequences and adapter contamination in the specified samples. The detected sequences were accordingly trimmed using Cutadapt and sequences with length {'<'} 20bp were removed. The trimming statistics are colour coded as green (good), yellow (warning) and red (bad).
//                     <br />
//                     <br />
//                     Overrepresentation of a particular sequence can be explained by two possibilities:
//                     <ul>
//                         <li style={{marginLeft:"2em"}}>(1) The sequence is highly biologically relevant (e.g. over expression of certain RNA because of a disease phenotype) </li>
//                         <li style={{marginLeft:"2em"}}>(2) The library is contaminated with sequences from adapters or other sources.</li>
//                     </ul>
//                     <br />
//                     Adapter contamination is the undesired sequencing of partial or complete adapter sequences. In bulk RNA-seq data analysis, adapter trimming is usually not necessary because RNA fragments are long, and the adapter is unlikely to be sequenced. Even with a partial sequencing of the adapter, the alignment will usually not be affected because of the soft clip functionality of the STAR aligner used. However, for short RNA-seq, the likelihood of adapter contamination in sequencing reads is high and trimming is desired. To err on the safe side, we will be trimmed the over represented sequences detected.
//                 </p>

//             </div>
//             <div style={containerStyle}>

//                 <br />
//                 <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
//                     <div style={{ display: "inline-block", width: "100%", float: "left", marginBottom: 20 }}>
//                         <div className="flex">
//                             <p style={{ color: "#0578A6", letterSpacing: "1.25px", fontWeight: "600" }}>Number of over represented sequences detected:&nbsp;</p>
//                             <p>{rowCount}</p>
//                         </div>
//                         <div className="flexClass" style={{ float: "right", marginLeft: 20, fontSize: "14px" }}>
//                             <label htmlFor="quickFilter" style={{ padding: "0px", letterSpacing: "1.2px" }}>Quick Filter:&nbsp;</label>
//                             <input style={{ height: "25px", width: "235px" }} type="text" id="quickFilter" onChange={onQuickFilterText} />
//                             <p className="ExportBtnStyle" style={{ marginLeft: 20 }} onClick={onBtnExport}>Export CSV</p>
//                         </div>
//                     </div>

//                     <div style={{ height: '48em', width: '100%' }} className="ag-theme-alpine">
//                         <AgGridReact
//                             onGridReady={onGridReady}
//                             onRowSelected={onRowSelected}
//                             onCellClicked={onCellClicked}
//                             quickFilterText={quickFilterText}
//                             icons={icons}
//                             columnDefs={columnDefs}
//                             rowData={rowData}
//                             rowSelection="multiple"
//                             groupHeaders
//                             defaultColDef={defaultColDef}
//                             rowMultiSelectWithClick={true}
//                             pagination={true}

//                             // Assigning reference to the grid
//                             ref={gridRef}

//                             // Set row height
//                             rowHeight={30} />
//                     </div>
//                 </div>
//             </div></>
//     );
// };

// export default DataQuality_Filtering_Comp;
