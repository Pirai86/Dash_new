import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const DataQuality_SeqQuality_LineGraph = ({
    DataQuality_SeqQuality_lengthData,
    yaxislabel = 'Y Axis Label',
    xaxislabel = 'X Axis Label',
    title = 'Line Graph Title'
}) => {
    const [plotData, setPlotData] = useState(DataQuality_SeqQuality_lengthData);

    useEffect(() => {
        setPlotData(DataQuality_SeqQuality_lengthData);
    }, [DataQuality_SeqQuality_lengthData]);

    const layout = {
        title: {
            text: title,
            x: 0.05,
            font: {
                size: 16
            }
        },
        xaxis: {
            title: {
                text: xaxislabel
            },
            tickangle: -45,
            tickmode: 'auto',
            nticks: 8,
            showgrid: true,
            gridcolor: '#e7e7e7'
        },
        yaxis: {
            title: {
                text: yaxislabel
            },
            tickformat: '.1f',
            showgrid: true,
            zeroline: false,
            gridcolor: '#e7e7e7'
        },
        showlegend: true,
        hovermode: 'closest',
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        },
        plot_bgcolor: '#f3f3f3',
        paper_bgcolor: 'white',
        shapes: [], // if needed for extra annotations or line shapes
        dragmode: 'zoom',
        font: {
            family: 'Arial, sans-serif'
        },
    };

    const config = {
        responsive: true,
        displayModeBar: true,
        displaylogo: false,
        modeBarButtonsToRemove: ['zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d', 'lasso2d', 'select2d'],
        scrollZoom: false // disables scroll zoom as in ApexCharts
    };

    // Convert the series data from ApexCharts format to Plotly format
    const data = plotData.map((seriesItem) => ({
        x: seriesItem.data.map((point) => point.x), // Replace with actual x values if they’re in `DataQuality_SeqQuality_lengthData`
        y: seriesItem.data.map((point) => point.y), // Replace with actual y values if they’re in `DataQuality_SeqQuality_lengthData`
        type: 'scatter',
        mode: 'lines+markers',
        marker: { size: 6 },
        line: { shape: 'spline', width: 3 },
        name: seriesItem.name,
    }));

    return (
        <Plot
            data={data}
            layout={layout}
            config={config}
            style={{ width: '100%', height: '550px' }}
        />
    );
};

export default DataQuality_SeqQuality_LineGraph;
