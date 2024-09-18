import React, { createContext, useState } from "react";
import qc_summary_data from "../data/qualitySummary/quality_summary_data.json";
import mean_quality_scores from "../data/sequenceQuality/mean_quality_scores_data.json";
import gc_content from "../data/sequenceQuality/gc_content_data.json";
import length_data from "../data/sequenceQuality/length_data.json";
import stats_data from "../data/rawDataStatistics/stats_data.json";
import filtering_data from "../data/filtering/filtering_data.json";
import choiceList_PCA from "../data/pca/choice_list.json";

let master_heatmap_data = qc_summary_data.data;

let correctionChoiceList = choiceList_PCA.correction_list;
let geneChoiceList = choiceList_PCA.gene_list;
let groupChoiceList = choiceList_PCA.covariate_list;
let plotTypeChoiceList = choiceList_PCA.plottype_list;

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const[isNavHomeActivated, setisNavHomeActivated] = useState(true);
  const[isNavTeamActivated, setisNavTeamActivated] = useState(false);
  const[isNavFavActivated, setisNavFavActivated] = useState(false);

  const [jwt, setjwt] = useState(null);
  const [globalExperimentID, setglobalExperimentID] = useState("");
  const [isGotoExperimentClicked, setisGotoExperimentClicked] = useState(false);
  const [isApplyBtnEnabled, setIsApplyBtnEnabled] = useState(false);
  const [isApplyBtnClicked, setisApplyBtnClicked] = useState(false);
  const Comparison_requests = [];
  const [loadingVolcano_Comparison, setloadingVolcano_Comparison] = useState(false);
  const [loadingGeneCluster_Comparison, setloadingGeneCluster_Comparison] = useState(true);
  const [loadingGeneSetVolImage_Comparison, setloadingGeneSetVolImage_Comparison] = useState(false);
  const [errorNotFoundDiffExp, seterrorNotFoundDiffExp] = useState(false);
  const [errorNotFoundGeneCluster_Comparison, seterrorNotFoundGeneCluster_Comparison] = useState(false);

  const [userfullName, setuserfullName] = useState(null);
  const [totalProjects, settotalProjects] = useState(0);
  const [totalExperiments, settotalExperiments] = useState(0);

  const [projectsName, setprojectsName] = useState([]);
  const [projectsID, setprojectsID] = useState([]);
  const [projectsDesc, setprojectsDesc] = useState([]);
  const [CreatedON, setCreatedON] = useState([]);
  const [LastModifiedON, setLastModifiedON] = useState([]);

  const [experimentsName, setexperimentsName] = useState([]);
  const [experimentsID, setexperimentsID] = useState([]);
  const [experimentsDesc, setexperimentsDesc] = useState([]);
  const [ExpCreatedON, setExpCreatedON] = useState([]);
  const [ExpLastModifiedON, setExpLastModifiedON] = useState([]);

  var [globalProjID, set_globalProjID] = useState("");
  var [ExpDiscard, set_ExpDiscard] = useState(0);
  var [globalProjCardIndex, set_globalProjCardIndex] = useState("");

  //Checking for empty component data
  const [isQualitySummaryEmpty, setisQualitySummaryEmpty] = useState(false);
  const [isMetadataEmpty, setisMetadataEmpty] = useState(false);
  const [isCountsNormalisationEmpty, setisCountsNormalisationEmpty] = useState(false);
  const [isCorrelationHeatmapEmpty, setisCorrelationHeatmapEmpty] = useState(false);
  const [isPCAEmpty, setisPCAEmpty] = useState(false);
  const [isSampleSetEmpty, setisSampleSetEmpty] = useState(false);
  const [isGeneExpressionEmpty, setisGeneExpressionEmpty] = useState(false);
  const [isExpressionHeatmapEmpty, setisExpressionHeatmapEmpty] = useState(false);
  const [isFilteringEmpty, setisFilteringEmpty] = useState(false);
  const [isDataStatsEmpty, setisDataStatsEmpty] = useState(false);
  const [isSeqQualityEmpty, setisSeqQualityEmpty] = useState(false);
  const [isComparison_DiffExpEmpty, setisComparison_DiffExpEmpty] = useState(false);

  //Experiment Setup
  const [ExpSetup_QualitySummary_Data, setExpSetup_QualitySummary_Data] = useState(master_heatmap_data);
  const [ExpSetup_QualitySummary_Control_Data, setExpSetup_QualitySummary_Control_Data] = useState(master_heatmap_data);
  const [ExpSetup_QualitySummary_xcat, setExpSetup_QualitySummary_xcat] = useState(qc_summary_data.xcats);
  const [ExpSetup_QualitySummary_ycat, setExpSetup_QualitySummary_ycat] = useState(qc_summary_data.ycats);
  
  var [ExpSetup_Metadata_Data, setExpSetup_Metadata_Data] = useState(null);
  var [ExpSetup_Metadata_Covariate, setExpSetup_Metadata_Covariate] = useState(null);

  //Samples
  const [Samples_CountsNormalisation_Control_DataSelection, setSamples_CountsNormalisation_Control_DataSelection] = useState("");
  const [Samples_CountsNormalisation_Control_DataList, setSamples_CountsNormalisation_Control_DataList] = useState([]);

  const [Samples_CorrelationHeatmap_Data, setSamples_CorrelationHeatmap_Data] = useState(null);
  const [Samples_CorrelationHeatmap_GroupChoice, setSamples_CorrelationHeatmap_GroupChoice] = useState("group");
  const [Samples_CorrelationHeatmap_CorrectionChoice, setSamples_CorrelationHeatmap_CorrectionChoice] = useState("corrected");
  const [Samples_CorrelationHeatmap_GeneChoice, setSamples_CorrelationHeatmap_GeneChoice] = useState("500");
  const [Samples_CorrelationHeatmap_LinkageChoice, setSamples_CorrelationHeatmap_LinkageChoice] = useState("ward_D2");
  const [Samples_CorrelationHeatmap_CutreedepthChoice, setSamples_CorrelationHeatmap_CutreedepthChoice] = useState("0.5");
  const [Samples_CorrelationHeatmap_DendData, setSamples_CorrelationHeatmap_DendData] = useState(null);

  const [Samples_PCA_CorrectionChoice, setSamples_PCA_CorrectionChoice] = useState(correctionChoiceList[0]);
  const [Samples_PCA_GeneChoice, setSamples_PCA_GeneChoice] = useState(geneChoiceList[0]);
  const [Samples_PCA_GroupChoice, setSamples_PCA_GroupChoice] = useState(groupChoiceList[0]);
  const [Samples_PCA_GroupChoice_List, setSamples_PCA_GroupChoice_List] = useState([]);
  const [Samples_PCA_PlotTypeChoice, setSamples_PCA_PlotTypeChoice] = useState(plotTypeChoiceList[0]);

  const [Samples_SampleSet_Heatmap_Data, setSamples_SampleSet_Heatmap_Data] = useState(null);
  const [Samples_SampleSet_PCAImg, setSamples_SampleSet_PCAImg] = useState(null);
  const [Samples_SampleSet_NormReadCountsImg, setSamples_SampleSet_NormReadCountsImg] = useState(null);
  const [Samples_SampleSet_DendImg, setSamples_SampleSet_DendImg] = useState(null);

  //Expression
  const [Expression_GeneExpression_GeneNames, setExpression_GeneExpression_GeneNames] = useState([]);
  const [Expression_GeneExpression_CategoryNames, setExpression_GeneExpression_CategoryNames] = useState([]);
  const [Expression_ExpressionHeatmap_Data, setExpression_ExpressionHeatmap_Data] = useState(null);

  //Comparison
  const [ComparsionControl_Data, setComparsionControl_Data] = useState(null);
  const [ComparsionControl_FactorChoice, setComparsionControl_FactorChoice] = useState(null);
  const [Comparison_selectedLevel1, setComparison_selectedLevel1] = useState("");
  const [Comparison_selectedLevel2, setComparison_selectedLevel2] = useState("");
  const [Comparison_lfcThreshold, setComparison_lfcThreshold] = useState("1");

  const [isComparison_PathwayClick, setComparison_PathwayClick] = useState("false");
  const [isComparison_GeneSetsClick, setComparison_GeneSetsClick] = useState("false");
  const [isComparison_DiseasesClick, setComparison_DiseasesClick] = useState("false");

  //MainEffects
  const [MainEffectsExtension, setMainEffectsExtension] = useState(null);
  const [factorChoice, setFactorChoice] = useState(null);

  //Data Quality
  var [DataQuality_Filtering_Data, setDataQuality_Filtering_Data] = useState(filtering_data);

  const [DataQuality_DataStatistics_Data, setDataQuality_DataStatistics_Data] = useState(stats_data);

  const [DataQuality_SeqQuality_MeanQualityScores, setDataQuality_SeqQuality_MeanQualityScores] = useState(mean_quality_scores.data);
  const [DataQuality_SeqQuality_MeanQualityScoresCopy, setDataQuality_SeqQuality_MeanQualityScoresCopy] = useState(mean_quality_scores.data);
  const [DataQuality_SeqQuality_GcContent, setDataQuality_SeqQuality_GcContent] = useState(gc_content.data);
  const [DataQuality_SeqQuality_GcContentCopy, setDataQuality_SeqQuality_GcContentCopy] = useState(gc_content.data);
  const [DataQuality_SeqQuality_lengthData, setDataQuality_SeqQuality_lengthData] = useState(length_data.data);
  const [DataQuality_SeqQuality_lengthDataCopy, setDataQuality_SeqQuality_lengthDataCopy] = useState(length_data.data);
  const [DataQuality_SeqQuality_Mean_title, setDataQuality_SeqQuality_Mean_title] = useState("");
  const [DataQuality_SeqQuality_Mean_xaxis, setDataQuality_SeqQuality_Mean_xaxis] = useState("");
  const [DataQuality_SeqQuality_Mean_yaxis, setDataQuality_SeqQuality_Mean_yaxis] = useState("");
  const [DataQuality_SeqQuality_Mean_ycats, setDataQuality_SeqQuality_Mean_ycats] = useState(mean_quality_scores.ycats);
  const [DataQuality_SeqQuality_gc_content_title, setDataQuality_SeqQuality_gc_content_title] = useState("");
  const [DataQuality_SeqQuality_gc_content_xaxis, setDataQuality_SeqQuality_gc_content_xaxis] = useState("");
  const [DataQuality_SeqQuality_gc_content_yaxis, setDataQuality_SeqQuality_gc_content_yaxis] = useState("");
  const [DataQuality_SeqQuality_length_title, setDataQuality_SeqQuality_length_title] = useState("");
  const [DataQuality_SeqQuality_length_xaxis, setDataQuality_SeqQuality_length_xaxis] = useState("");
  const [DataQuality_SeqQuality_length_yaxis, setDataQuality_SeqQuality_length_yaxis] = useState("");

  const appendToprojectsName = (value) => {
    setprojectsName((prevArray) => [...prevArray, value]);
  };

  const appendToexperimentsName = (value) => {
    setexperimentsName((prevArray) => [...prevArray, value]);
  };

  const appendToprojectsID = (value) => {
    setprojectsID((prevArray) => [...prevArray, value]);
  };

  const appendToexperimentsID = (value) => {
    setexperimentsID((prevArray) => [...prevArray, value]);
  };

  const appendToprojectsDesc = (value) => {
    setprojectsDesc((prevArray) => [...prevArray, value]);
  };

  const appendToexperimentsDesc = (value) => {
    setexperimentsDesc((prevArray) => [...prevArray, value]);
  };

  const appendToCreatedON = (value) => {
    setCreatedON((prevArray) => [...prevArray, value]);
  };

  const appendToExpCreatedON = (value) => {
    setExpCreatedON((prevArray) => [...prevArray, value]);
  };

  const appendToLastModifiedON = (value) => {
    setLastModifiedON((prevArray) => [...prevArray, value]);
  };

  const appendToExpLastModifiedON = (value) => {
    setExpLastModifiedON((prevArray) => [...prevArray, value]);
  };

  return (
    <GlobalContext.Provider
      value={{
        jwt,
        setjwt,
        userfullName,
        setuserfullName,
        totalProjects,
        settotalProjects,
        totalExperiments,
        settotalExperiments,
        isNavHomeActivated, setisNavHomeActivated,
        isNavTeamActivated, setisNavTeamActivated,
        isNavFavActivated, setisNavFavActivated,


        ExpSetup_QualitySummary_Data, setExpSetup_QualitySummary_Data,
        ExpSetup_QualitySummary_Control_Data, setExpSetup_QualitySummary_Control_Data,
        ExpSetup_QualitySummary_xcat, setExpSetup_QualitySummary_xcat,
        ExpSetup_QualitySummary_ycat, setExpSetup_QualitySummary_ycat,
        ExpSetup_Metadata_Data,
        setExpSetup_Metadata_Data,
        ExpSetup_Metadata_Covariate,
        setExpSetup_Metadata_Covariate,
        factorChoice,
        setFactorChoice,
        Samples_CorrelationHeatmap_Data,
        setSamples_CorrelationHeatmap_Data,
        Samples_SampleSet_Heatmap_Data,
        setSamples_SampleSet_Heatmap_Data,
        Samples_SampleSet_PCAImg,
        setSamples_SampleSet_PCAImg,
        Samples_SampleSet_NormReadCountsImg,
        setSamples_SampleSet_NormReadCountsImg,
        Samples_SampleSet_DendImg,
        setSamples_SampleSet_DendImg,
        Expression_ExpressionHeatmap_Data, setExpression_ExpressionHeatmap_Data,
        ComparsionControl_Data, setComparsionControl_Data,
        ComparsionControl_FactorChoice, setComparsionControl_FactorChoice,
        isGotoExperimentClicked,
        setisGotoExperimentClicked,
        isApplyBtnEnabled, setIsApplyBtnEnabled,
        isApplyBtnClicked, setisApplyBtnClicked,
        MainEffectsExtension,
        setMainEffectsExtension,
        Comparison_selectedLevel1,
        setComparison_selectedLevel1,
        Comparison_selectedLevel2,
        setComparison_selectedLevel2,
        Comparison_lfcThreshold,
        setComparison_lfcThreshold,
        isComparison_PathwayClick, setComparison_PathwayClick,
        isComparison_GeneSetsClick, setComparison_GeneSetsClick,
        isComparison_DiseasesClick, setComparison_DiseasesClick,
        Expression_GeneExpression_GeneNames,
        setExpression_GeneExpression_GeneNames,
        Expression_GeneExpression_CategoryNames,
        setExpression_GeneExpression_CategoryNames,
        globalExperimentID,
        setglobalExperimentID,

        DataQuality_SeqQuality_MeanQualityScores,
        setDataQuality_SeqQuality_MeanQualityScores,
        DataQuality_SeqQuality_MeanQualityScoresCopy,
        setDataQuality_SeqQuality_MeanQualityScoresCopy,
        DataQuality_SeqQuality_GcContent,
        setDataQuality_SeqQuality_GcContent,
        DataQuality_SeqQuality_GcContentCopy,
        setDataQuality_SeqQuality_GcContentCopy,
        DataQuality_SeqQuality_lengthData,
        setDataQuality_SeqQuality_lengthData,
        DataQuality_SeqQuality_lengthDataCopy,
        setDataQuality_SeqQuality_lengthDataCopy,

        DataQuality_DataStatistics_Data,
        setDataQuality_DataStatistics_Data,
        DataQuality_Filtering_Data,
        setDataQuality_Filtering_Data,

        DataQuality_SeqQuality_Mean_title,
        setDataQuality_SeqQuality_Mean_title,
        DataQuality_SeqQuality_Mean_xaxis,
        setDataQuality_SeqQuality_Mean_xaxis,
        DataQuality_SeqQuality_Mean_yaxis,
        setDataQuality_SeqQuality_Mean_yaxis,
        DataQuality_SeqQuality_Mean_ycats,
        setDataQuality_SeqQuality_Mean_ycats,
        DataQuality_SeqQuality_gc_content_title,
        setDataQuality_SeqQuality_gc_content_title,
        DataQuality_SeqQuality_gc_content_xaxis,
        setDataQuality_SeqQuality_gc_content_xaxis,
        DataQuality_SeqQuality_gc_content_yaxis,
        setDataQuality_SeqQuality_gc_content_yaxis,
        DataQuality_SeqQuality_length_title,
        setDataQuality_SeqQuality_length_title,
        DataQuality_SeqQuality_length_xaxis,
        setDataQuality_SeqQuality_length_xaxis,
        DataQuality_SeqQuality_length_yaxis,
        setDataQuality_SeqQuality_length_yaxis,

        projectsName,
        setprojectsName,
        appendToprojectsName,
        experimentsName,
        setexperimentsName,
        appendToexperimentsName,

        projectsID,
        setprojectsID,
        appendToprojectsID,
        experimentsID,
        setexperimentsID,
        appendToexperimentsID,

        projectsDesc,
        setprojectsDesc,
        appendToprojectsDesc,
        experimentsDesc,
        setexperimentsDesc,
        appendToexperimentsDesc,

        CreatedON,
        setCreatedON,
        appendToCreatedON,
        ExpCreatedON,
        setExpCreatedON,
        appendToExpCreatedON,

        LastModifiedON,
        setLastModifiedON,
        appendToLastModifiedON,
        ExpLastModifiedON,
        setExpLastModifiedON,
        appendToExpLastModifiedON,

        globalProjID,
        set_globalProjID,
        ExpDiscard,
        set_ExpDiscard,
        globalProjCardIndex,
        set_globalProjCardIndex,

        Samples_CorrelationHeatmap_GroupChoice,
        setSamples_CorrelationHeatmap_GroupChoice,
        Samples_CorrelationHeatmap_CorrectionChoice,
        setSamples_CorrelationHeatmap_CorrectionChoice,
        Samples_CorrelationHeatmap_GeneChoice,
        setSamples_CorrelationHeatmap_GeneChoice,
        Samples_CorrelationHeatmap_LinkageChoice,
        setSamples_CorrelationHeatmap_LinkageChoice,
        Samples_CorrelationHeatmap_CutreedepthChoice,
        setSamples_CorrelationHeatmap_CutreedepthChoice,
        Samples_CorrelationHeatmap_DendData,
        setSamples_CorrelationHeatmap_DendData,
        Comparison_requests,
        loadingVolcano_Comparison, setloadingVolcano_Comparison,
        loadingGeneCluster_Comparison, setloadingGeneCluster_Comparison,
        loadingGeneSetVolImage_Comparison, setloadingGeneSetVolImage_Comparison,
        errorNotFoundDiffExp, seterrorNotFoundDiffExp,
        errorNotFoundGeneCluster_Comparison, seterrorNotFoundGeneCluster_Comparison,

        Samples_PCA_CorrectionChoice,
        setSamples_PCA_CorrectionChoice,
        Samples_PCA_GeneChoice,
        setSamples_PCA_GeneChoice,
        Samples_PCA_GroupChoice,
        setSamples_PCA_GroupChoice,
        Samples_PCA_GroupChoice_List,
        setSamples_PCA_GroupChoice_List,
        Samples_PCA_PlotTypeChoice,
        setSamples_PCA_PlotTypeChoice,
        Samples_CountsNormalisation_Control_DataSelection,
        setSamples_CountsNormalisation_Control_DataSelection,
        Samples_CountsNormalisation_Control_DataList,
        setSamples_CountsNormalisation_Control_DataList,

        isQualitySummaryEmpty, setisQualitySummaryEmpty,
        isMetadataEmpty, setisMetadataEmpty,
        isCountsNormalisationEmpty, setisCountsNormalisationEmpty,
        isCorrelationHeatmapEmpty, setisCorrelationHeatmapEmpty,
        isPCAEmpty, setisPCAEmpty,
        isSampleSetEmpty, setisSampleSetEmpty,
        isGeneExpressionEmpty, setisGeneExpressionEmpty,
        isExpressionHeatmapEmpty, setisExpressionHeatmapEmpty,
        isFilteringEmpty, setisFilteringEmpty,
        isDataStatsEmpty, setisDataStatsEmpty,
        isSeqQualityEmpty, setisSeqQualityEmpty,
        isComparison_DiffExpEmpty, setisComparison_DiffExpEmpty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
