import "../ImageInfo/ImageInfo.css";

function CountNormalisationRaw_Info() {
  return (
    <div className="ImageInfo_Style">
      <p className="Heading">Box Plot</p>

      <p className="" style={{ marginTop: ".5em" }}>
        A box plot typically contains the following 4 comps:
      </p>

      <div className="" style={{paddingLeft:"1em"}}>
        <p className="Heading-Alternate margin-T1">Rectangle</p>
        <p className="" style={{ marginTop: ".5em" }}>
          A rectangle
          whose length is between the 1st (lower) and the 3rd (upper) quartiles.
          50% of values fall within this interval
        </p>

        <p className="Heading-Alternate margin-T1">Whiskers</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Vertical lines
          spanning to the minimum and maximum of values, excluding outliers
        </p>

        <p className="Heading-Alternate margin-T1">Outliers</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Dots representing values of extreme deviation
        </p>

        <p className="Heading-Alternate margin-T1">The Median</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Together, they depict the locality, spread
          and skewness of the data values. Before normalisation, the box plots
          show the differences in data spread and locality between the samples.
        </p>
      </div>
    </div>
  );
}

export default CountNormalisationRaw_Info;
