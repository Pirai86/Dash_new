import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Components/Global";
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Samples_SampleSet_Notes_Comp = () => {
    const { globalExperimentID, setSamples_CorrelationHeatmap_Notes, jwt, isGotoExperimentClicked,
        Samples_CorrelationHeatmap_GroupChoice,
        Samples_CorrelationHeatmap_CorrectionChoice,
        Samples_CorrelationHeatmap_GeneChoice,
        Samples_CorrelationHeatmap_LinkageChoice,
        Samples_SampleSet_Notes, setSamples_SampleSet_Notes,
        Samples_PCA_GroupChoice } = useContext(GlobalContext);

    const formattedText = typeof Samples_SampleSet_Notes === 'string'
        ? Samples_SampleSet_Notes
            .replace(/<break>/g, '<p style="margin-top: 1em;">')
            .replace(/<\\break>/g, '</p>')
            .replace(/<green colour>/g, '<span style="color: #14b469; font-weight: bold;">')
            .replace(/<\\green colour>/g, '</span>')
            .replace(/<yellow colour>/g, '<span style="color: #F3C623; font-weight: bold;">')
            .replace(/<\\yellow colour>/g, '</span>')
            .replace(/<red colour>/g, '<span style="color: #AB1E09; font-weight: bold;">')
            .replace(/<\\red colour>/g, '</span>')
            .replace(/<link to data quality>/g, '<span id="data-quality-link" style="color: blue; text-decoration: underline; cursor: pointer;">')
            .replace(/<\\link to data quality>/g, '</span>')
            .replace(/<bullet>/g, '<ul><li style="margin-left:2.5em;">')
            .replace(/<\/bullet>/g, '</li></ul>')
            .replace(/<\\bullet>/g, '</li></ul>')
        : '';


    useEffect(() => {

        function callAxios() {
            axios
                .post(
                    `${BACKEND_API_URL}samples/notes?expt_id=${globalExperimentID}&samples_page=sample_set`,
                    {
                        batch_correction: Samples_CorrelationHeatmap_CorrectionChoice,
                        category_name: Samples_PCA_GroupChoice,
                        annotation_rows: Samples_CorrelationHeatmap_GroupChoice,
                        top_var_genes: parseInt(Samples_CorrelationHeatmap_GeneChoice, 10),
                        dendro_linkage: Samples_CorrelationHeatmap_LinkageChoice,
                    },
                    {
                        headers: {
                            'accept': 'application/json',
                            Authorization: `Bearer ${jwt}`,
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then((response) => {
                    // Handle successful response
                    setSamples_SampleSet_Notes(response.data.notes);
                    //console.log("Correlation Heatmap Notes : ", response.data.notes);
                })
                .catch((error) => {
                    // setisCountsNormalisationEmpty(true);
                    console.log("Error in Correlation Heatmap Notes : ", error);
                    if (error.response?.status === 401) {
                        //console.log("Unauthorized access - possible invalid token");
                        navigate("/login");
                    } else if (error.response?.status === 403) {
                        console.error("Access denied - insufficient permissions");
                    }
                });

        }

        if (isGotoExperimentClicked) {
            callAxios();
        }

    }, [globalExperimentID, Samples_PCA_GroupChoice, Samples_CorrelationHeatmap_CorrectionChoice, Samples_CorrelationHeatmap_GroupChoice, Samples_CorrelationHeatmap_GeneChoice, Samples_CorrelationHeatmap_LinkageChoice])

    return (
        <div className="Note-Style" dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
}

export default Samples_SampleSet_Notes_Comp;
