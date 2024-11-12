import "../ImageInfo/ImageInfo.css";

function CountNormalisationNormalised_Info() {
  return (
    <div className="ImageInfo_Style">
      <p className="Heading">Normalisation</p>
      <p className="" style={{ marginTop: ".5em" }}>
        It is a process designed to identify and correct technical biases removing the least possible biological signal. This enables the comparisons of gene expression data from different samples. Deseq2’s variance stabilizing normalisation method was used to perform the normalisation.
      </p>

      <p style={{ marginTop: ".5em" }}>
        To know more, read here : &nbsp;
        <a href="https://rdrr.io/bioc/DESeq2/man/varianceStabilizingTransformation.html" target="blank">https://rdrr.io/bioc/DESeq2/man/varianceStabilizingTransformation.html</a>
      </p>

      <p className="Heading margin-T1">Box Plot</p>
      <p className="" style={{ marginTop: ".5em" }}>
        A box plot depicts the locality, spread and skewness of the data values and typically contains the following 4 components
      </p>

      <div className="" style={{ paddingLeft: "1em" }}>
        <p className="Heading-Alternate margin-T1">Rectangle</p>
        <p className="" style={{ marginTop: ".5em" }}>
          A rectangle whose length is between the 1st (lower) and the 3rd (upper) quartiles. 50% of values fall within this interval
        </p>

        <p className="Heading-Alternate margin-T1">Whiskers</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Vertical lines spanning to the minimum and maximum of values, excluding outliers
        </p>

        <p className="Heading-Alternate margin-T1">Outliers</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Dots representing values of extreme deviation
        </p>

        <p className="Heading-Alternate margin-T1">A line within the rectangle</p>
        <p className="" style={{ marginTop: ".5em" }}>
          The median
        </p>
      </div>

    </div>
  );
}

export default CountNormalisationNormalised_Info;
