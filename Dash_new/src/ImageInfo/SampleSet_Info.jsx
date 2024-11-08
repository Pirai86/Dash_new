import "../ImageInfo/ImageInfo.css";

function SampleSetPCA_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        <span className="ImageInfo_heading">What is a PCA? &nbsp;</span>{" "}
        <br />
        <br />
        PCA reduces the dimensionality of the data by
        transforming it into a new set of variables called principal components,
        which capture the maximum variance in the data. The first few principal
        components typically capture the majority of the variance. 
        <br />
        <br />
        This plot
        shows whether the selected group categorization contributes
        significantly to the principal components. In other words, a significant
        effect of group in a PC coordinate indicates that the PC can be
        explained by the group.
      </p>
    </div>
  );
}

function CorrelationDend_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        <span className="ImageInfo_heading">What is a dendrogram: &nbsp;</span>
        Dendrogram, a tree-like structure depicted on the top of the heatmap as
        well as independently, represents the hierarchical clustering of samples
        based on their similarity. On the dendrogram, the branches of closely
        related samples join at a lower level. The height at which two sample
        branches join each other is indicative of the distance between them.
        Closely clustered samples on a dendrogram show darker colours on the
        heatmap. The annotation of the samples into their group category is
        provided as coloured legends.
      </p>
    </div>
  );
}

export { SampleSetPCA_Info, CorrelationDend_Info };
