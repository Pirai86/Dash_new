import "../ImageInfo/ImageInfo.css";

function PCA_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        PCA reduces the dimensionality of the data by transforming it into a new
        set of variables called principal components, which capture the maximum
        variance in the data. The first few principal components typically
        capture the majority of the variance. This plot shows whether the
        selected group categorization contributes significantly to the principal
        components. In other words, a significant effect of group in a PC
        coordinate indicates that the PC can be explained by the group.
      </p>
    </div>
  );
}

function PCA_Boxplot_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        This plot shows whether the selected group categorization contributes
        significantly to the principal components. In other words, a significant
        effect of group in a PC coordinate indicates that the PC can be
        explained by the group.
      </p>
    </div>
  );
}

export { PCA_Info, PCA_Boxplot_Info };
