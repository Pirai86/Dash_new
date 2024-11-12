import "../ImageInfo/ImageInfo.css";

function PCA_Info() {
  return (
    <div className="ImageInfo_Style">
      <p className="Heading">PCA</p>

      <p className="" style={{ marginTop: ".5em" }}>
        PCA reduces the dimensionality of the data by transforming it into a new set of variables called principal components, which capture the maximum variance in the data. The first few principal components typically capture most of the variance.
      </p>
    </div>
  );
}

function PCA_Boxplot_Info() {
  return (
    <div className="ImageInfo_Style">
      <p className="Heading">PCA - BoxPlot</p>
      <p className="" style={{ marginTop: ".5em" }}>
        This plot shows whether the factor contributes significantly to the principal components. In other words, a significant effect of factor in a PC coordinate indicates that the PC can be explained by the group.
      </p>
    </div>
  );
}

export { PCA_Info, PCA_Boxplot_Info };
