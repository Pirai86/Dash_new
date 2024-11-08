import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import Image_Info from "../../../ImageInfo/QualitySummary_Info";
import { GlobalContext } from "../../Global";
import Info_Icon from "../../../assets/Info_Icon.svg";
import QualitySummary_Info from "../../../ImageInfo/QualitySummary_Info";

const ExpSetup_QualitySummary_Comp = ({ ActivateSection, ...props }) => {

    const { ExpSetup_QualitySummary_Data, setExpSetup_QualitySummary_Data } = useContext(GlobalContext);
    const [isNormInfoVisible, setIsNormInfoVisible] = useState(false);

    const handleNormCancelIconClick = () => {
        setIsNormInfoVisible(false);
    };

    const handleNormImageInfoIconClick = () => {
        setIsNormInfoVisible(true);
    };

    useEffect(() => {
        setExpSetup_QualitySummary_Data(ExpSetup_QualitySummary_Data);
    }, [ExpSetup_QualitySummary_Data]);

    const options = {
        chart: {
            redrawOnParentResize: true,
            type: "heatmap",
            height: "100%",
            width:"100%"
        },
        grid: { padding: { top: 0, bottom: 0 } },
        plotOptions: {
            heatmap: {
                enableShades: true,
                shadeIntensity: 0,
                radius: 0,
                useFillColorAsStroke: false,
                colorScale: {
                    ranges: [
                        {
                            from: 0.71,
                            to: 1.0,
                            name: "Pass",
                            color: "#bfc9d9",
                        },
                        {
                            from: 0.41,
                            to: 0.7,
                            name: "Warning",
                            color: "#F3C623",

                        },
                        {
                            from: 0.0,
                            to: 0.4,
                            name: "Fail",
                            color: "#AB1E09",
                        },
                    ],
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            type: "category",
            labels: {
                rotate: -25,
                hideOverlappingLabels: false,
                style: {
                    fontSize: "12px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    cssClass: "apexcharts-xaxis-label",
                },
            },
        },
        yaxis: {
            labels: {
                hideOverlappingLabels: true,
                style: {
                    fontSize: "12px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    cssClass: "apexcharts-yaxis-label",
                },
            },
        },
        legend: {
            show: true,
            // position: "right",
            verticalAlign: "center",
            floating: false,
            fontSize: "14px",
            fontFamily: "Roboto, sans-serif",
            fontWeight: 600,
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 5,
                strokeColor: "#fff",
                radius: 0,
                offsetX: 0,
                offsetY: 0,
            },
        },
        stroke: {
            width: 1,
        },
        // title: {
        //     text: "Heatmap summary of data QC",
        //     style: {
        //         fontSize: "16px",
        //         fontFamily: "Helvetica, Arial, sans-serif",
        //         fontWeight: 200,
        //     },
        // },
    };

    return (
        
            <ReactApexChart
                options={options}
                series={ExpSetup_QualitySummary_Data}
                type="heatmap"
                height="100%"
                width="100%"
            />
        
    );
};

export default ExpSetup_QualitySummary_Comp;
