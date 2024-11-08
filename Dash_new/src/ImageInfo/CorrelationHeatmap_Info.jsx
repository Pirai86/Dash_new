import "../ImageInfo/ImageInfo.css";

function CorrelationHeatmap_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        <span className="ImageInfo_heading">What is a heatmap: &nbsp;</span> The x-axis and y-axis in the heatmap represent the
        samples. The heatmap is coloured based on the Pearson correlation
        co-efficient between the corresponding samples. Hence, the heatmap is a
        symmetric matrix with 1 (darkest blue colour) along the diagonal. Higher
        the correlation co-efficient implies darker the blue colour and higher
        the similarity between the samples. Clusters of samples that are similar
        to each other form blue box clusters along the diagonal. The annotation
        of the samples into their group category is provided as coloured
        legends. 
      </p>
    </div>
  );
}

function CorrelationDend_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        <span className="ImageInfo_heading">What is a dendrogram: &nbsp;</span>Dendrogram, a tree-like structure
        depicted on the top of the heatmap as well as independently, represents
        the hierarchical clustering of samples based on their similarity. On the
        dendrogram, the branches of closely related samples join at a lower
        level. The height at which two sample branches join each other is
        indicative of the distance between them. Closely clustered samples on a
        dendrogram show darker colours on the heatmap. The annotation of the
        samples into their group category is provided as coloured legends.
      </p>
    </div>
  );
}

export {CorrelationHeatmap_Info, CorrelationDend_Info};
