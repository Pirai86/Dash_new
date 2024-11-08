import "../ImageInfo/ImageInfo.css";

function SeqQuality_GC() {
    return (
        <div className="ImageInfo_Style">
            <p>
                GC content varies by species and genomic region. A deviation of {">"} 10% from the reference genome may indicate contamination.
                <br />
                <br />
                In the latest human reference genome GRCh38, the GC content is 39.3% for the whole genome, 48.9% for coding RNA, 39.7% for
                long noncoding RNA (lncRNA), 50.2% for rRNA, 51.5% for miRNA, 55.7% for tRNA and 46.7% for other species of small RNAs.
            </p>
        </div>
    )
}

export default SeqQuality_GC;