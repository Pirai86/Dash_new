import React, { useState, useEffect, useContext } from "react";
import ReactApexChart from "react-apexcharts";
import { GlobalContext } from "../../Global";
import "../../../Styles/ExpSetup_QualitySummary_Comp.css";
import InfoImg from "../../../assets/info.png";
import QualitySummary_Info from "../../../ImageInfo/QualitySummary_Info";
import InfoClose from "../../../assets/infoClose.png";

const ExpSetup_QualitySummary_Comp = ({ ActivateSection, ...props }) => {

    const { ExpSetup_QualitySummary_Data, setExpSetup_QualitySummary_Data, ExpSetup_QualitySummary_ColLength, ExpSetup_QualitySummary_RowLength } = useContext(GlobalContext);


    const [CalcHeight, setCalcHeight] = useState(0);
    const [CalcWidth, setCalcWidth] = useState(0);

    const [InfoClicked, setInfoClicked] = useState(false);

    useEffect(() => {

        const setCalcHeightFunc = () => {
            let height = (ExpSetup_QualitySummary_RowLength * 3) + 24;
            return height > 100 ? 100 : height;
        }

        setCalcHeight(setCalcHeightFunc());

        console.log("Height after calc", CalcHeight);
    }, [ExpSetup_QualitySummary_RowLength])

    useEffect(() => {

        const setCalcWidthFunc = () => {
            let width = (ExpSetup_QualitySummary_ColLength * 4.12);
            return width > 100 ? 100 : width;
        }

        setCalcWidth(setCalcWidthFunc());

        console.log("Width after calc", CalcWidth);
    }, [ExpSetup_QualitySummary_ColLength])

    useEffect(() => {
        setExpSetup_QualitySummary_Data(ExpSetup_QualitySummary_Data);
    }, [ExpSetup_QualitySummary_Data]);

    const handleInfoClick = (Action) => {
        setInfoClicked(false);

        switch (Action) {
            case "Open":
                setInfoClicked(true);
                break;
            case "Close":
                setInfoClicked(false);
                break;
            default:
                break;
        }
    }

    const options = {
        chart: {
            redrawOnParentResize: true,
            type: "heatmap",
            height: "100%",
            width: "100%"
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
                            // color: "#bfc9d9",
                            color: "#14b469",
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
        <div
            className=""
            style={{
                width: `${CalcWidth}%`,
                height: `${CalcHeight}%`,
                margin: "auto",
                position: "relative"
            }}
        >
            <ReactApexChart
                options={options}
                series={ExpSetup_QualitySummary_Data}
                type="heatmap"
                height="100%"
                width="100%"
            />
            <div className={`InfoImg-Container`} onClick={() => handleInfoClick("Open")}>
                <img className="InfoImg" src={InfoImg} alt="" />
            </div>

            <div className={`Info-Container-75 ${InfoClicked ? "clicked" : ""}`}>
                <div className="">
                    <QualitySummary_Info />
                </div>
            </div>
            <div className={`Top-Space ${InfoClicked ? "clicked" : ""}`}>

            </div>
            <div className={`Info-Close-Btn ${InfoClicked ? "" : "d-no"}`} onClick={() => handleInfoClick("Close")}>
                <img className="InfoCloseImg" src={InfoClose} alt="" />
            </div>
        </div>
    );
};

export default ExpSetup_QualitySummary_Comp;
