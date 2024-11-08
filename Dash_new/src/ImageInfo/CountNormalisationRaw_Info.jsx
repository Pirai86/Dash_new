import "../ImageInfo/ImageInfo.css";

function CountNormalisationRaw_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        <span className="ImageInfo_heading">What is a boxplot box :&nbsp;</span>{" "}
        A box plot typically contains the following 4 components: 
        <br />
        <br />
        <span className="ImageInfo_heading">1. Rectangle :&nbsp;</span> A rectangle
        whose length is between the 1st (lower) and the 3rd (upper) quartiles.
        50% of values fall within this interval; 
        <br />
        <br />
        <span className="ImageInfo_heading">2. Whiskers :&nbsp;</span> Vertical lines
        spanning to the minimum and maximum of values, excluding outliers; 
        <br />
        <br />
        <span className="ImageInfo_heading">3. Outliers :&nbsp;</span>Dots representing values of extreme deviation 
        <br />
        <br />
        <span className="ImageInfo_heading">4. A line within 
        the rectangle : The median &nbsp;</span> Together, they depict the locality, spread
        and skewness of the data values. Before normalisation, the box plots
        show the differences in data spread and locality between the samples.
      </p>
    </div>
  );
}

export default CountNormalisationRaw_Info;
