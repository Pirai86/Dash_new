import React, { useContext, useState } from "react";
import DataQuality_SeqQuality_LineGraph from "./DataQuality_SeqQuality_LineGraph";
import DataQuality_SeqQuality_PlotStackedBarGraph from "./DataQuality_SeqQuality_PlotStackedBarGraph";
//import "../../Styles/DataQuality_SeqQuality_Comp.css";
import { GlobalContext } from "../Global";


const DataQuality_SeqQuality_Comp = () => {
    const {
        DataQuality_SeqQuality_MeanQualityScores,
        DataQuality_SeqQuality_fastqScreenColors,
        DataQuality_SeqQuality_fastqScreenCategories,
        DataQuality_SeqQuality_fastqScreenSeries,
        DataQuality_SeqQuality_rsemMappingColors,
        DataQuality_SeqQuality_rsemMappingCategories,
        DataQuality_SeqQuality_rsemMappingSeries,
        DataQuality_SeqQuality_starAlignmentColors,
        DataQuality_SeqQuality_starAlignmentCategories,
        DataQuality_SeqQuality_starAlignmentSeries,
        DataQuality_SeqQuality_featureCountsColors,
        DataQuality_SeqQuality_featureCountsSeries,
        DataQuality_SeqQuality_featureCountsCategories,
        DataQuality_SeqQuality_Mean_title,
        DataQuality_SeqQuality_Mean_xaxis,
        DataQuality_SeqQuality_Mean_yaxis,
        DataQuality_SeqQuality_GcContent,
        DataQuality_SeqQuality_gc_content_title,
        DataQuality_SeqQuality_gc_content_xaxis,
        DataQuality_SeqQuality_gc_content_yaxis,
        DataQuality_SeqQuality_lengthData,
        DataQuality_SeqQuality_length_title,
        DataQuality_SeqQuality_length_xaxis,
        DataQuality_SeqQuality_length_yaxis
    } = useContext(GlobalContext);


    return (
        <>
            <div className="my-row">
                <div className="my-col">
                    <div className="" style={{ position: "relative" }}>

                        <DataQuality_SeqQuality_LineGraph
                            DataQuality_SeqQuality_lengthData={DataQuality_SeqQuality_MeanQualityScores}
                            yaxislabel={DataQuality_SeqQuality_Mean_yaxis}
                            xaxislabel={DataQuality_SeqQuality_Mean_xaxis}
                            title={DataQuality_SeqQuality_Mean_title} />
                    </div>
                </div>
                <div className="my-col">
                    <div className="" style={{ position: "relative" }}>
                        <DataQuality_SeqQuality_LineGraph
                            DataQuality_SeqQuality_lengthData={DataQuality_SeqQuality_GcContent}
                            yaxislabel={DataQuality_SeqQuality_gc_content_yaxis}
                            xaxislabel={DataQuality_SeqQuality_gc_content_xaxis}
                            title={DataQuality_SeqQuality_gc_content_title} />
                    </div>
                </div>
            </div>
            <div className="my-row">
                <div className="my-col">
                    <DataQuality_SeqQuality_LineGraph
                        DataQuality_SeqQuality_lengthData={DataQuality_SeqQuality_lengthData}
                        yaxislabel={DataQuality_SeqQuality_length_yaxis}
                        xaxislabel={DataQuality_SeqQuality_length_xaxis}
                        title={DataQuality_SeqQuality_length_title} />
                </div>
                <div className="my-col">
                    <DataQuality_SeqQuality_PlotStackedBarGraph
                        series={DataQuality_SeqQuality_featureCountsSeries}
                        categories={DataQuality_SeqQuality_featureCountsCategories}
                        colors={DataQuality_SeqQuality_featureCountsColors}
                        yaxislabel="# Reads"
                        xaxislabel="Samples"
                        title="featureCounts: Assignments"
                    />
                </div>
            </div>

            <div className="my-row">
                <div className="my-col">
                    <DataQuality_SeqQuality_PlotStackedBarGraph
                        series={DataQuality_SeqQuality_starAlignmentSeries}
                        categories={DataQuality_SeqQuality_starAlignmentCategories}
                        colors={DataQuality_SeqQuality_starAlignmentColors}
                        yaxislabel="# Reads"
                        xaxislabel="Samples"
                        title="STAR Alignment: Mapping"
                    />
                </div>
                <div className="my-col">
                    <DataQuality_SeqQuality_PlotStackedBarGraph
                        series={DataQuality_SeqQuality_rsemMappingSeries}
                        categories={DataQuality_SeqQuality_rsemMappingCategories}
                        colors={DataQuality_SeqQuality_rsemMappingColors}
                        yaxislabel="# Reads"
                        xaxislabel="Samples"
                        title="RSEM: Mapped reads"
                    />
                </div>
            </div>

            <div className="my-row">
                <div className="my-col">
                    <DataQuality_SeqQuality_PlotStackedBarGraph
                        series={DataQuality_SeqQuality_fastqScreenSeries}
                        categories={DataQuality_SeqQuality_fastqScreenCategories}
                        colors={DataQuality_SeqQuality_fastqScreenColors}
                        yaxislabel="# Reads"
                        xaxislabel="Samples"
                        title="FastQ Screen: Genome Alignment"
                    />
                </div>
            </div>
        </>
    );
};

export default DataQuality_SeqQuality_Comp;
