import "../ImageInfo/ImageInfo.css";

function QualitySummary_Info() {
  return (
    <div className="ImageInfo_Style">

      <div className="">
        <p className="Heading">Basic Statistics</p>
        <p className="" style={{ marginTop: ".5em" }}>Simple composition statistics of sequence length and %GC content</p>

        <p className="Heading margin-T1">Per Base Sequence Quality</p>
        <p className="" style={{ marginTop: ".5em" }}> Overview of the range of quality values across all bases at each position in the sample.
          A warning will be issued if the lower quartile for any base is less than 10, or if the median for any base is less than 25.
          This module will raise a failure if the lower quartile for any base is less than 5 or if the median for any base is less than 20.</p>

        <p className="Heading margin-T1">Per Sequence Quality scores</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Check if a subset of the sequences has universally low-quality values, often because they are poorly imaged (on the edge of the field of view etc).
          A warning is raised if the most frequently observed mean quality is below 27 - this equates to a 0.2% error rate.
          An error is raised if the most frequently observed mean quality is below 20 - this equates to a 1% error rate.
        </p>

        <p className="Heading margin-T1">Per Base Sequence Content</p>
        <p className="" style={{ marginTop: ".5em" }}> Checks the proportion of each base (A,C,T,G) called at every position in a sample.
          A random library would have little to no difference between proportion of the different bases and will reflect the amount of these bases in the organism genome.
          Strong biases indicate an overrepresented sequence which is contaminating the library.
          A bias that is consistent across all bases either indicates that the original library was sequence biased, or that there was a systematic problem during the
          sequencing of the library. This module issues a warning if the difference between A and T, or G and C is greater than 10% in any position.
          This module will fail if the difference between A and T, or G and C is greater than 20% in any position.</p>

        <p className="Heading margin-T1">Per Sequence GC Content</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Measures the GC content across the whole length of each sequence in a sample and compares it to a modelled normal distribution of GC content.
          An unusually shaped distribution could indicate a contaminated library. A warning is raised if the sum of the deviations from the normal distribution represents more
          than 15% of the reads. This module will indicate a failure if the sum of the deviations from the normal distribution represents more than 30% of the reads.
        </p>

        <p className="Heading margin-T1">Per Base N Content</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Plots out the percentage of base calls at each position for which the sequencer was unable to make a base call with sufficient confidence.
          It's not unusual to see a very low proportion of Ns appearing in a sequence, especially nearer the end of a sequence. This module raises a warning if any position
          shows an N content of &gt;5%. This module will raise an error if any position shows an N content of &gt;20%.
        </p>

        <p className="Heading margin-T1">Sequence Length Distribution</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Analyses the distribution of fragment sizes in the sample. This module will raise a warning if all sequences are not the same length.
          This module will raise an error if any of the sequences have zero length.
        </p>

        <p className="Heading margin-T1">Overrepresented Sequences</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Looks for single sequences that make a disproportionately large fraction of reads. This could mean that either the sequence is highly
          biologically significant, or that the library is contaminated. This module will issue a warning if any sequence is found to represent more than 0.1% of the total.
          This module will issue an error if any sequence is found to represent more than 1% of the total.
        </p>

        <p className="Heading margin-T1">Adapter Content</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Finds Kmers that do not have even coverage through the length of reads. These reads may be different sources of bias including the presence of
          read-through adapter sequences building up on the end of the sequences. This module will issue a warning if any sequence is present in more than 5% of all reads.
          This module will issue a warning if any sequence is present in more than 10% of all reads.
        </p>

        <p className="Heading margin-T1">More Info on FastQC Analysis Modules</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Head to <a href="https://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/" target="blank">https://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/</a>
        </p>

        <p className="Heading margin-T1">Aligned Reads &gt; 3M</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the number of aligned reads in a sample is &lt; 5 million. Fails if fewer than 3M aligned reads are obtained in a sample.
        </p>

        <p className="Heading margin-T1">Percent GC Content Outlier</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the percent GC content in a sample is below or above 3 standard deviations from the median of percent GC content of all samples
          in the dataset. Fails if the sample has an unusually low or high GC content compared to others in the dataset.
        </p>

        <p className="Heading margin-T1">Percent Alignable reads Outlier</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the percent of alignable reads in a sample is below 3 standard deviations from the median of percent alignable reads of all
          samples in the dataset. Fails if the sample has an unusually low percent of alignable reads compared to others in the dataset.
        </p>

        <p className="Heading margin-T1">Percent Mapped reads Outlier</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the percent of uniquely mapped reads in a sample is below 3 standard deviations from the median of percent of uniquely mapped
          reads of all samples in the dataset. Fails if the sample has an unusually low percent of uniquely mapped reads compared to others in the dataset.
        </p>

        <p className="Heading margin-T1">Percent Multiple Mapped reads Outlier</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the percent of multiple mapped reads in a sample is below or above 3 standard deviations from the median of percent of
          multiple mapped reads of all samples in the dataset. Fails if the sample has an unusually low or high percent of multiple mapped reads compared to others in the dataset.
        </p>

        <p className="Heading margin-T1">Percent read Duplicates Outlier</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the percent of duplicate reads in a sample is above 3 standard deviations from the median of percent of duplicate reads of all
          samples in the dataset. Fails if the sample has an unusually high percent of duplicate reads compared to others in the dataset.
        </p>

        <p className="Heading margin-T1">Sample Contamination &lt; 30%</p>
        <p className="" style={{ marginTop: ".5em" }}>
          Checks if the percent of reads that mapped to an organism other than the one sequenced is &gt; 30%. Fails if &gt; 30% of reads mapped to a
          different organism.
        </p>

      </div>
    </div >
  );
}

export default QualitySummary_Info;
