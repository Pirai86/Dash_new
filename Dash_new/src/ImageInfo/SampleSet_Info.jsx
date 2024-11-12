import "../ImageInfo/ImageInfo.css";

function SampleSetPCA_Info() {
  return (
    <div className="ImageInfo_Style">
      <p className="Heading">PCA</p>
      <p>
        
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
