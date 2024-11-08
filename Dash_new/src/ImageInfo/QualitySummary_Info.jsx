import "../ImageInfo/ImageInfo.css";

function QualitySummary_Info() {
  return (
    <div className="ImageInfo_Style">
      <p>
        On the x axis, different quality checks are listed. On the y axis,
        individual samples are listed. The cells are coloured green if the
        corresponding samples passed the specific QC checks; coloured orange if
        it is a warning and coloured red if the sample failed the QC.
        <br />
        <br />
        <span className="ImageInfo_heading">
          Basic Statistics:
        </span>{" "}
        Simple composition statistics of sequence length and %GC content
        <br />
        <br />
        <span
          className="ImageInfo_heading"
        >
          Per Base Sequence Quality:
        </span>{" "}
        Overview of the range of quality values across all bases at each
        position in the sample. A warning will be issued if the lower quartile
        for any base is less than 10, or if the median for any base is less than
        25. This module will raise a failure if the lower quartile for any base
        is less than 5 or if the median for any base is less than 20.
        <br />
        <br />
        <span className="ImageInfo_heading">Per Sequnce Quality scores:</span>{" "} Check if a subset of the sequences have
        universally low quality values, often because they are poorly imaged (on
        the edge of the field of view etc). A warning is raised if the most
        frequently observed mean quality is below 27 - this equates to a 0.2%
        error rate. An error is raised if the most frequently observed mean
        quality is below 20 - this equates to a 1% error rate.
        <br />
        <br />
        <span className="ImageInfo_heading">Per Base sequence content:</span>{" "} Checks the proportion of each base (A,C,T,G)
        called at every position in a sample. A random library would have little
        to no difference between proportion of the different bases and will
        reflect the amount of these bases in the organism genome. Strong biases
        indicate an overrepresented sequence which is contaminating the library.
        A bias that is consistent across all bases either indicates that the
        original library was sequence biased, or that there was a systematic
        problem during the sequencing of the library. This module issues a
        warning if the difference between A and T, or G and C is greater than
        10% in any position. This module will fail if the difference between A
        and T, or G and C is greater than 20% in any position.
        <br />
        <br />
        <span className="ImageInfo_heading">Per Sequence GC content:</span>{" "}  measures the GC content across the whole length
        of each sequence in a sample and compares it to a modelled normal
        distribution of GC content. An unusually shaped distribution could
        indicate a contaminated library. A warning is raised if the sum of the
        deviations from the normal distribution represents more than 15% of the
        reads. This module will indicate a failure if the sum of the deviations
        from the normal distribution represents more than 30% of the reads.
        <br />
        <br />
        <span className="ImageInfo_heading">Per Base N content:</span>{" "}  plots out the percentage of base calls at each
        position for which the sequencer was unable to make a base call with
        sufficient confidence. It's not unusual to see a very low proportion of
        Ns appearing in a sequence, especially nearer the end of a sequence.
        This module raises a warning if any position shows an N content of `
        {">"}` 5%. This module will raise an error if any position shows an N
        content of `{">"}` 20%.
        <br />
        <br />
        <span className="ImageInfo_heading">Sequence Length Distribution:</span>{" "} Analyses the distribution of fragment
        sizes in the sample. This module will raise a warning if all sequences
        are not the same length. This module will raise an error if any of the
        sequences have zero length.
        <br />
        <br />
        <span className="ImageInfo_heading">Overrepresented Sequences:</span>{" "} Looks for single sequences that make a
        disproportionately large fraction of reads. This could mean that either
        the sequence is highly biologically significant, or that the library is
        contaminated. This module will issue a warning if any sequence is found
        to represent more than 0.1% of the total. This module will issue an
        error if any sequence is found to represent more than 1% of the total.
        <br />
        <br />
        <span className="ImageInfo_heading">Adapter Content:</span>{" "} Finds Kmers that do not have even coverage through the
        length of reads. These reads may be different sources of bias including
        the presence of read-through adapter sequences building up on the end of
        the sequences. This module will issue a warning if any sequence is
        present in more than 5% of all reads. This module will issue a warning
        if any sequence is present in more than 10% of all reads.
        <br />
        <br />
        For more information on FastQC analysis modules, head to
        <a href="https://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/"> https://www.bioinformatics.babraham.ac.uk/projects/fastqc/Help/3%20Analysis%20Modules/</a>
        <br />
        <br />
        <span className="ImageInfo_heading">Aligned Reads `{">"}` 5M:</span>{" "} Checks if the number of aligned reads in a
        sample is `{"<"}` 5 million. Fails if fewer that 5M aligned reads are
        obtained in a sample.
        <br />
        <br />
        <span className="ImageInfo_heading">Percent GC content outlier:</span>{" "} Checks if the percent GC content in a sample
        is below 3 standard deviations or above 3 standard deviations from the
        median of percent GC content of all samples in the dataset. Fails if the
        sample has an unusually low or high GC content compared to others in the
        dataset.
        <br />
        <br />
        <span className="ImageInfo_heading">Percent Alignable reads Outlier:</span>{" "} Checks if the percent of alignable
        reads in a sample is below 3 standard deviations from the median of
        percent alignable reads of all samples in the dataset. Fails if the
        sample has an unusually low percent of alignable reads compared to
        others in the dataset.
        <br />
        <br />
        <span className="ImageInfo_heading">Percent Aligned reads outlier:</span>{" "} Checks if the percent of aligned reads in
        a sample is below 3 standard deviations from the median of percent
        aligned reads of all samples in the dataset. Fails if the sample has an
        unusually low percent of aligned reads compared to others in the
        dataset.
        <br />
        <br />
        <span className="ImageInfo_heading">Percent mapped reads outlier:</span>{" "} Checks if the percent of uniquely mapped
        reads in a sample is below 3 standard deviations from the median of
        percent of uniquely mapped reads of all samples in the dataset. Fails if
        the sample has an unusually low percent of uniquely mapped reads
        compared to others in the dataset.
        <br />
        <br />
        <span className="ImageInfo_heading">Percent multiple mapped reads outlier:</span>{" "}  Checks if the percent of multiple
        mapped reads in a sample is below 3 standard deviations or above 3
        standard deviations from the median of percent of multiple mapped reads
        of all samples in the dataset. Fails if the sample has an unusually low
        or high percent of multiple mapped reads compared to others in the
        dataset.
        <br />
        <br />
        <span className="ImageInfo_heading">Percent read duplicates outlier:</span>{" "} Checks if the percent of duplicate
        reads in a sample is above 3 standard deviations from the median of
        percent of duplicate reads of all samples in the dataset. Fails if the
        sample has an unusually high percent of duplicate reads compared to
        others in the dataset.
        <br />
        <br />
        <span className="ImageInfo_heading">Sample contamination `{"<"}` 3%:</span>{" "} Checks if the percent of reads that
        mapped to an organism other than the one sequenced is `{">"}` 3%. Fails
        if `{">"}` 3% of reads mapped to a different organism.
      </p>
    </div>
  );
}

export default QualitySummary_Info;
