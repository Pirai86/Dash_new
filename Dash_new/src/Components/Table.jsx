import { useEffect, useState } from "react";
import "../Styles/Table.css";
import PageLeft from "../assets/triangle-left.png";
import PageRight from "../assets/triangle-right.png";
import SortUp from "../assets/triangle-up.png";
import SortDown from "../assets/triangle-down.png";
import * as XLSX from "xlsx";

function Table({ dataTable, showCheckBox, filterColor, colWidth, highlightedColumns, highlightedColors, resultName, width, height, maxHeight, filterDisplay, sortingDisplay, displayFooter, rowHeight, colHeaderColor, entriesOptions, tableFontSize, paddingLeftRight }) {
    const [CurrentPage, setCurrentPage] = useState(1);

    const [DisplayEntries, setDisplayEntries] = useState(entriesOptions[0]);
    const [TableColumns, setTableColumns] = useState(dataTable.columnNames);
    const [TableRows, setTableRows] = useState(dataTable.data);
    const [visibleRows, setVisibleRows] = useState([]);
    const [fadingOut, setFadingOut] = useState(false);

    const [IsHovered, setIsHovered] = useState(false);

    // State for sorting
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [DisplayStatus, setDisplayStatus] = useState(false);

    // State for column filters
    const [filters, setFilters] = useState({});

    // State for selected rows
    const [selectedRows, setSelectedRows] = useState({});
    const [isSelectAll, setIsSelectAll] = useState(false);

    const [DownloadSelected, setDownloadSelected] = useState(false);
    const [showPagination, setShowPagination] = useState(true);

    const [isFiltered, setIsFiltered] = useState(false);

    const totalPages = Math.ceil(TableRows.length / DisplayEntries);


    useEffect(() => {
        setTableRows(dataTable.data);
        setTableColumns(dataTable.columnNames);
        console.log("TableColumns:", dataTable.columnNames);
        console.log("TableRows:", dataTable.data);
        console.log("Col Width : ", colWidth)
    }, [dataTable.data, dataTable.columnNames, colWidth]);



    // Update visible rows based on current page, display entries, and filters
    useEffect(() => {
        setFadingOut(true);

        const timer = setTimeout(() => {
            setFadingOut(false);
            const filteredRows = filterRows(TableRows);  // Apply filtering logic

            if (Object.values(filters).some((filterValue) => filterValue)) {
                // If any filter has text, show all filtered rows on one page and hide pagination
                setVisibleRows(filteredRows);
                setCurrentPage(1);
                setShowPagination(false);  // Hide pagination when filters are applied
            } else {
                // If no filters are applied, show data based on the current page and DisplayEntries
                const startIndex = (CurrentPage - 1) * DisplayEntries;
                setVisibleRows(filteredRows.slice(startIndex, startIndex + DisplayEntries));
                setShowPagination(true);   // Show pagination when no filters are applied
            }
        }, 200);

        return () => clearTimeout(timer);
    }, [DisplayEntries, CurrentPage, TableRows, filters]);

    // Handle sorting the entire data (TableRows), not just visible rows
    const sortTableRows = (column, direction) => {
        const sortedRows = [...TableRows].sort((a, b) => {
            if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setTableRows(sortedRows); // Set the sorted rows for the entire dataset
        setCurrentPage(1); // Reset to first page after sorting
    };

    // Handle sorting when arrow is clicked
    const handleSortClick = (column, direction) => {
        setSortColumn(column);
        setSortDirection(direction);
        sortTableRows(column, direction); // Sort the entire TableRows, not just visible rows
        setDisplayStatus(true);
    };

    // Handle filter input changes
    const handleFilterChange = (column, value) => {
        setFilters((prevFilters) => {
            const newFilters = {
                ...prevFilters,
                [column]: value.toLowerCase(), // Convert to lowercase for case-insensitive matching
            };

            // Check if any filter has a value
            const hasFilters = Object.values(newFilters).some((filterValue) => filterValue !== "");

            setIsFiltered(hasFilters);
            console.log("IsFilter:", hasFilters);

            return newFilters;
        });

        setCurrentPage(1);  // Reset to first page after filtering
    };


    // Filtering function to match rows based on filter inputs
    const filterRows = (rows) => {
        return rows.filter((row) => {
            return Object.keys(filters).every((column) => {
                // Check if the row has the column name and it matches the filter value
                const rowKey = Object.keys(row).find(key => key.toLowerCase() === column.toLowerCase());
                if (rowKey) {
                    return row[rowKey].toString().toLowerCase().includes(filters[column]);
                }
                return true; // If column doesn't exist in the row, skip filtering for that column
            });
        });
    };

    // Handle changing the number of displayed entries
    const handleDisplayEntriesChange = (value) => {
        if (value === "All") {
            console.log("All Selected");
            setDisplayEntries(TableRows.length);
        }
        else {
            setDisplayEntries(parseInt(value));
        }

        setCurrentPage(1);
    };

    // Handle page click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle left page click
    const handleLeftPageClick = () => {
        if (CurrentPage > 1) {
            setCurrentPage(CurrentPage - 1);
        }
    };

    // Handle right page click
    const handleRightPageClick = () => {
        if (CurrentPage < totalPages) {
            setCurrentPage(CurrentPage + 1);
        }
    };

    // Handle checkbox change for selecting individual rows
    const handleRowSelect = (rowIndex) => {
        const originalIndex = (CurrentPage - 1) * DisplayEntries + rowIndex;  // Calculate the original index in TableRows
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = {
                ...prevSelectedRows,
                [originalIndex]: !prevSelectedRows[originalIndex], // Toggle the selection status for the original index
            };

            // Calculate how many rows are currently selected
            const selectedRowCount = Object.values(newSelectedRows).filter((isSelected) => isSelected).length;

            // Update select all checkbox status
            const allRowsSelected = Object.keys(newSelectedRows).length === TableRows.length;
            setIsSelectAll(allRowsSelected);

            setDownloadSelected(selectedRowCount > 0 && selectedRowCount < TableRows.length);

            return newSelectedRows;
        });
    };

    // Handle checkbox change for selecting all filtered/visible rows
    const handleSelectAllRows = (e) => {
        const isChecked = e.target.checked;
        setIsSelectAll(isChecked);  // Update select-all state

        const newSelectedRows = {};

        if (isChecked) {
            // Select all visible (filtered) rows, based on visibleRows array
            visibleRows.forEach((_, rowIndex) => {
                const fullIndex = (CurrentPage - 1) * DisplayEntries + rowIndex;  // Calculate full index of the row
                newSelectedRows[fullIndex] = true;  // Mark filtered visible rows as selected
            });
        }

        setSelectedRows(newSelectedRows);
        setDownloadSelected(Object.keys(newSelectedRows).length > 0);  // Enable download if any row is selected
    };


    // Function to download selected rows as an Excel file
    const handleDownloadSelected = () => {
        console.log("Download Selected clicked");

        let selectedRowsData = TableRows;

        if (isFiltered) {
            selectedRowsData = visibleRows.filter((_, rowIndex) => selectedRows[rowIndex]);
        }
        else {
            selectedRowsData = TableRows.filter((_, rowIndex) => selectedRows[rowIndex]);
        }

        if (selectedRowsData.length === 0) {
            alert("No rows selected");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(selectedRowsData);  // Convert selected rows to Excel format
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Data");

        // Download the workbook as an Excel file
        XLSX.writeFile(workbook, "selected_data.xlsx");
    };


    // Function to download all rows as an Excel file
    const handleDownloadAll = () => {
        console.log("Download all clicked");
        const worksheet = XLSX.utils.json_to_sheet(TableRows);  // Convert all table rows to Excel format
        const workbook = XLSX.utils.book_new();  // Create a new Excel workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "All Data");  // Add worksheet to workbook

        // Download the workbook as an Excel file
        XLSX.writeFile(workbook, "all_data.xlsx");
    };

    return (
        <div className="Table-GB" style={{ width: width }}>
            <div className="">
                <div className="Table-header">
                    <div className="">
                        <p> {resultName ? resultName : "Results"} : {dataTable.data.length}</p>
                    </div>
                    <div className={`${Object.values(selectedRows).filter((isSelected) => isSelected).length > 0 ? "" : "d-no"}`}>
                        <p>Status :
                            <span className="Status-Span">
                                &nbsp;{Object.values(selectedRows).filter((isSelected) => isSelected).length}
                                {Object.values(selectedRows).filter((isSelected) => isSelected).length === 1 ? ' row' : ' rows'} selected
                            </span>
                        </p>
                    </div>
                </div>
                <div className="Horizontal-Container">
                    <div className="Horizontal-Line">
                        <div className="Horizontal-Inline" style={{ backgroundColor: colHeaderColor }}></div>
                    </div>
                </div>
                <div className="Table-contents">
                    <div className="Column-Header" style={{ width: `${colWidth}px` }}>
                        <div className="" style={{display: showCheckBox ? "" : "none"}}>
                            <div className="Column-CheckBox" style={{ backgroundColor: colHeaderColor }}>
                                <input
                                    type="checkbox"
                                    className="row-checkbox"
                                    onChange={handleSelectAllRows}  // Handle select all
                                    checked={isSelectAll}  // Track the state of the select-all checkbox
                                />
                            </div>
                        </div>

                        {TableColumns.map((Column, index) => (
                            <div key={index} className="Column-Name" style={{ backgroundColor: colHeaderColor }}>
                                {Column}
                                <div className={`Arrows ${sortingDisplay ? '' : 'd-no'}`}>
                                    <div className="Arrows-container">
                                        <img
                                            className="SortUp"
                                            src={SortUp}
                                            alt="Sort Descending"
                                            onClick={() => handleSortClick(Column, 'desc')}
                                        />
                                        <img
                                            className="SortDown"
                                            src={SortDown}
                                            alt="Sort Ascending"
                                            onClick={() => handleSortClick(Column, 'asc')}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`Col-Filter-Continer ${filterDisplay ? "" : "d-no"}`}>
                        <div className={`Column-Filter`} style={{ width: `${colWidth}px` }}>

                            <div className="" style={{display: showCheckBox ? "" : "none"}}>
                                <div className="CheckBox-Space" style={{ backgroundColor: filterColor ? filterColor : "" }}>
                                    
                                </div>
                            </div>

                            {TableColumns.map((Column, index) => (
                                <div key={index} className="Column-Name" style={{ backgroundColor: filterColor ? filterColor : "" }}>
                                    <div className="TableFilter">
                                        <input
                                            className="TableFilterInput"
                                            type="text"
                                            placeholder={`${Column}`}
                                            value={filters[Column] || ""}
                                            onChange={(e) => handleFilterChange(Column, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="Rows" style={{ height: height, maxHeight: maxHeight, width: `${colWidth}px` }}>
                        {visibleRows.map((row, rowIndex) => {
                            const fullIndex = (CurrentPage - 1) * DisplayEntries + rowIndex;  // Full index of the row in the entire dataset
                            return (
                                <div
                                    key={rowIndex}
                                    className={`Row-Container ${fadingOut ? "fade-out" : ""} ${selectedRows[fullIndex] ? "highlighted-row" : ""}`}
                                    onClick={() => handleRowSelect(rowIndex)}  // Use rowIndex to track selection
                                    style={{ height: rowHeight, paddingLeft: paddingLeftRight, paddingRight: paddingLeftRight, width: colWidth }}
                                >
                                    <div className="" style={{display: showCheckBox ? "" : "none"}}>
                                        <div className="CheckBox-Container">
                                            <input
                                                type="checkbox"
                                                className="row-checkbox"
                                                onChange={(e) => e.stopPropagation()}  // Prevent row click when checkbox is clicked
                                                checked={selectedRows[fullIndex] || false}  // Use fullIndex to check if this row is selected
                                            />
                                        </div>
                                    </div>

                                    {TableColumns.map((column, colIndex) => {
                                        const isHighlighted = highlightedColumns && highlightedColumns.includes(colIndex);
                                        const highlightColor = isHighlighted
                                            ? highlightedColors[highlightedColumns.indexOf(colIndex)]
                                            : "";

                                        return (
                                            <p
                                                key={colIndex}
                                                className="Row"
                                                style={{
                                                    backgroundColor: highlightColor,
                                                    fontSize: tableFontSize,
                                                }}
                                            >
                                                {/* {row[column]} */}
                                                {row[column] && row[column].length > 27 ? `${row[column].slice(0, 27)}...` : row[column]}
                                            </p>
                                        );
                                    })}

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
            <div className={`Table-footer ${displayFooter ? "" : "d-no"}`}>
                <div className="Tablecontainer">
                    <div className={`Download-Btn`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            border: IsHovered ? `1px solid ${colHeaderColor}` : ""
                        }}>
                        <p className={`DownloadAll ${DownloadSelected ? "d-no" : ""}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{ color: IsHovered ? `${colHeaderColor}` : "" }}
                            onClick={handleDownloadAll}>Download All</p>
                        <p className={`DownloadSelected ${DownloadSelected ? "" : "d-no"}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            style={{ color: IsHovered ? `${colHeaderColor}` : "" }}
                            onClick={handleDownloadSelected}>Download Selected</p>
                    </div>
                    <div className={`Page-Number ${showPagination ? "" : "d-no"}`}>
                        <img className="Page-Left-Img" src={PageLeft} alt="" onClick={handleLeftPageClick} />

                        {totalPages > 3 && CurrentPage > 2 && (
                            <p onClick={() => handlePageClick(1)}>1</p>
                        )}

                        {totalPages > 3 && CurrentPage > 3 && (
                            <span>...</span>
                        )}

                        {Array.from({ length: Math.min(totalPages, 3) }, (_, index) => {
                            const pageNumber = Math.max(2, CurrentPage - 1) + index; // Center the current page in the display
                            return (
                                pageNumber <= totalPages && (
                                    <p
                                        key={pageNumber}
                                        onClick={() => handlePageClick(pageNumber)}

                                        className={CurrentPage === pageNumber ? "active-page" : ""}
                                    >
                                        {pageNumber}
                                    </p>
                                )
                            );
                        })}

                        {totalPages > 3 && CurrentPage < totalPages - 2 && (
                            <span>...</span>
                        )}

                        {totalPages > 3 && CurrentPage < totalPages - 1 && (
                            <p onClick={() => handlePageClick(totalPages)}>{totalPages}</p>
                        )}

                        <img className="Page-Right-Img" src={PageRight} alt="" onClick={handleRightPageClick} />
                    </div>

                    <div className="Entries">
                        <p>Show</p>
                        <div className="custom-select">
                            <select name="" id="" onChange={(e) => handleDisplayEntriesChange(e.target.value)}>
                                {entriesOptions.map((option) => (  // Map over the entriesOptions prop
                                    <option key={option} value={option}>
                                        {option} Entries
                                    </option>
                                ))}
                                <option value="All">All</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;