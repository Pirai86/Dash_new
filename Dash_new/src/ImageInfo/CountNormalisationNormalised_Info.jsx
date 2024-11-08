import "../ImageInfo/ImageInfo.css";

function CountNormalisationNormalised_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
      <span className="ImageInfo_heading">Normalization :&nbsp;</span> 
        It is a process designed to identify and correct technical
        biases removing the least possible biological signal. This enables the
        comparisons of gene expression data from different samples. Deseq2’s
        variance stabilizing normalisation method was used to perform the
        normalisation. 
        <br />
        <br />
        To know more, read here:
        <br />
        <a href="https://rdrr.io/bioc/DESeq2/man/varianceStabilizingTransformation.html">https://rdrr.io/bioc/DESeq2/man/varianceStabilizingTransformation.html</a>
      </p>
    </div>
  );
}

export default CountNormalisationNormalised_Info;
