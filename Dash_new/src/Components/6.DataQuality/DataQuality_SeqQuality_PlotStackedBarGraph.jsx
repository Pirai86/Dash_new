import React from "react";
import PropTypes from "prop-types";
import Plot from "react-plotly.js";

const DataQuality_SeqQuality_PlotStackedBarGraph = ({
    series,
    categories,
    colors = [],
    yaxislabel = "# Reads",
    xaxislabel = "Samples",
    title = "featureCounts: Assignments"
}) => {
    // Prepare the Plotly data array from the ApexCharts-style series data
    const data = series.map((seriesItem, index) => ({
        x: categories, // Set the x-axis categories
        y: seriesItem.data, // Set the y-axis data for each series
        type: 'bar',
        name: seriesItem.name, // Series name for the legend
        marker: { color: colors[index] || 'blue' }, // Use provided colors or default
    }));

    const layout = {
        title: {
            text: title,
            x: 0.05,
            font: {
                size: 16,
                color: "#263238",
                family: "Arial, sans-serif"
            }
        },
        xaxis: {
            title: {
                text: xaxislabel,
                font: {
                    size: 14,
                    color: "#263238",
                    family: "Arial, sans-serif"
                }
            },
            tickangle: -45,
            tickmode: 'array',
            tickvals: categories,
        },
        yaxis: {
            title: {
                text: yaxislabel,
                font: {
                    size: 14,
                    color: "#263238",
                    family: "Arial, sans-serif"
                }
            },
            tickformat: ',',
            rangemode: 'nonnegative',
        },
        barmode: 'stack', // Stack bars as in ApexCharts
        legend: {
            x: 0.85,
            y: 1.1,
            orientation: 'h'
        },
        margin: {
            l: 60,
            r: 20,
            t: 60,
            b: 100
        },
        plot_bgcolor: "#fff",
        paper_bgcolor: "#fff",
        hovermode: "closest",
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'lasso2d', 'select2d'],
        scrollZoom: false, // Enables zoom functionality
    };

    return (
        <div className="plot-stacked-bar-graph">
            <Plot
                data={data}
                layout={layout}
                config={config}
                style={{ width: '100%', height: '550px' }}
            />
        </div>
    );
};

// Define prop types for better type checking
DataQuality_SeqQuality_PlotStackedBarGraph.propTypes = {
    series: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            data: PropTypes.arrayOf(PropTypes.number).isRequired
        })
    ).isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
    yaxislabel: PropTypes.string,
    xaxislabel: PropTypes.string,
    title: PropTypes.string
};

export default DataQuality_SeqQuality_PlotStackedBarGraph;
