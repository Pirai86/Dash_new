import { useContext } from "react";
import { GlobalContext } from "../../Components/Global";

function ExpSetup_QualitySummary_Notes_Comp() {

    const { ExpSetup_QualitySummary_Notes } = useContext(GlobalContext);

    const formattedText = typeof ExpSetup_QualitySummary_Notes === 'string'
        ? ExpSetup_QualitySummary_Notes
            .replace(/<break>/g, '<p style="margin-top: 1em;">')
            .replace(/<\\break>/g, '</p>')
            .replace(/<green colour>/g, '<span style="color: #14b469; font-weight: bold;">')
            .replace(/<\\green colour>/g, '</span>')
            .replace(/<yellow colour>/g, '<span style="color: #F3C623; font-weight: bold;">')
            .replace(/<\\yellow colour>/g, '</span>')
            .replace(/<red colour>/g, '<span style="color: #AB1E09; font-weight: bold;">')
            .replace(/<\\red colour>/g, '</span>')
            .replace(/<link to data quality>/g, '<a href="/data-quality">')
            .replace(/<\\link to data quality>/g, '</a>')
        : '';

    return (

         <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: formattedText }} />
        // <div className="" style={{ textAlign: "justify" }}>
        //     {ExpSetup_QualitySummary_Notes}
        // </div>

        // <div style={{ textAlign: "justify" }}>

        //     <p>
        //         {ExpSetup_QualitySummary_Notes}
        //     </p>
        //     {/* 8 samples of bulk RNA-sequencing from Human were analysed from fastq files. The sample names are SRR1039508, SRR1039509,
        //     SRR1039512, SRR1039513, SRR1039516, SRR1039517, SRR1039520 and SRR1039521. The factor of interest for the experiment is treatment.
        //     <p style={{ marginTop: "1em" }}>
        //         Before analysing the data to draw biological conclusions, the reads underwent extensive Quality Control (QC) assessments in several stages to
        //         detect any biases or inconsistencies.
        //     </p>

        //     <p style={{ marginTop: "1em" }}>
        //         First, the raw sequencing reads underwent preliminary QC using FastQC to evaluate per-base sequence quality, GC content, adapter contamination,
        //         and duplication levels. The flagged contaminants, if any (tabulated in <span>Data Quality &gt; Filtering</span>),
        //         were filtered using TrimGalore and re-assessed with FastQC. The trimmed reads were further checked for contaminants from other species using FastQ Screen and aligned
        //         to reference genome using STAR. RSEM was used to quantify the gene expression. Several QC metrics were quantified at each of these steps, including quantification of
        //         gene biotype using featureCounts.
        //     </p>
        //     <p style={{ marginTop: "1em" }}>
        //         A summary plot of all the QC checks performed on the data is shown below. In the plot, the samples are plotted on the y-axis and different QC parameters are on the x-axis.
        //         The samples are colour coded based on whether they <span style={{ color: "#14b469", fontWeight: "bold" }}>passed</span>, <span style={{ color: "#F3C623", fontWeight: "bold" }}>passed with warning</span> or <span style={{ color: "#AB1E09", fontWeight: "bold" }}>failed </span>
        //         the QC checks. Please note that these results are on post-filtered and post-processed data. If you want a detailed view of the quality of raw reads, please refer
        //         to <span>Data Quality</span> section.
        //     </p>

        //     <p style={{ marginTop: "1em" }}>
        //         In the dataset, all the samples passed (with or without warning) our QC checks, indicating excellent overall quality of sequencing. The data are reliable and
        //         recommended for further analysis.
        //     </p> */}
        // </div>
    )
}

export default ExpSetup_QualitySummary_Notes_Comp;