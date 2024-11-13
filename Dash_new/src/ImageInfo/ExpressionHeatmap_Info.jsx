import "../ImageInfo/ImageInfo.css";

function ExpressionHeatmap_Info() {
    return (
        <div className="ImageInfo_Style">

            <p className="Heading">Expression Heatmap</p>
            <p className="" style={{ marginTop: ".5em" }}>
                The x-axis and y-axis in the heatmap represent the samples and genes respectively. 
                The heatmap is coloured based on the z-score of gene expression in the corresponding samples. 
                Higher relative gene expression values are <span style={{color:"#bc1b2c", fontWeight:"bold"}}>red</span>, and indicate “upregulation” of the genes in the samples. 
                Lower relative gene expression values are <span style={{color:"#4257c9", fontWeight:"bold"}}>blue</span>, and indicate “downregulation” of the genes in the samples. 
                Samples are ordered based on the similarity of gene expression signatures. 
                The annotation of the samples into their experimental conditions is provided as coloured legends.
            </p>
        </div>
    );
}

export default ExpressionHeatmap_Info;
