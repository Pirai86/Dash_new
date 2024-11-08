import "../ImageInfo/ImageInfo.css";

function SeqQuality_Mean_Score() {
    return (
        <div className="ImageInfo_Style">
            <p>
                For data generated from the Illumina sequencing platform GA II, the base quality score usually starts out high,
                then gradually degrades as the cycle increases, moving along the read. 
                <br />
                <br />
                The drop in base quality score can be attributed
                to a variety of factors, including phasing/prephasing, a decreased signal to noise ratio and template damage over many
                cycles of laser imaging. 
                <br />
                <br />
                Later sequencing platforms (HiSeq, MiSeq) produce base quality scores in which the first 10–15 cycles
                / positions are relatively lower compared to the middle section of the read. 
                <br />
                <br />
                Both these patterns are expected and is not
                considered a hindrance for further alignment and data analysis. 

                To date, no alignment issues have been reported because of
                the lower-quality bases at the beginning of the reads.
            </p>
        </div>
    )
}

export default SeqQuality_Mean_Score;