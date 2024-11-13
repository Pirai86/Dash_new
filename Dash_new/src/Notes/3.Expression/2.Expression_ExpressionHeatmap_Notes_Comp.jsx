import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Components/Global";
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const Expression_ExpressionHeatmap_Notes_Comp = () => {
    const { globalExperimentID, jwt, isGotoExperimentClicked,
        Expression_ExpressionHeatmap_Notes, setExpression_ExpressionHeatmap_Notes,
    } = useContext(GlobalContext);

    const formattedText = typeof Expression_ExpressionHeatmap_Notes === 'string'
        ? Expression_ExpressionHeatmap_Notes
            .replace(/<break>/g, '<p style="margin-top: 1em;">')
            .replace(/<\\break>/g, '</p>')
            .replace(/<green colour>/g, '<span style="color: #14b469; font-weight: bold;">')
            .replace(/<\\green colour>/g, '</span>')
            .replace(/<yellow colour>/g, '<span style="color: #F3C623; font-weight: bold;">')
            .replace(/<\\yellow colour>/g, '</span>')
            .replace(/<red colour>/g, '<span style="color: #AB1E09; font-weight: bold;">')
            .replace(/<\\red colour>/g, '</span>')
            .replace(/<\/red colour>/g, '</span>')
            .replace(/<blue colour>/g, '<span style="color: #4257c9; font-weight: bold;">')
            .replace(/<\/blue colour>/g, '</span>')
            .replace(/<link to data quality>/g, '<span id="data-quality-link" style="color: blue; text-decoration: underline; cursor: pointer;">')
            .replace(/<\\link to data quality>/g, '</span>')
            .replace(/<bullet>/g, '<ul><li style="margin-left:2.5em;">')
            .replace(/<\/bullet>/g, '</li></ul>')
            .replace(/<\\bullet>/g, '</li></ul>')
        : '';


    useEffect(() => {

        function callAxios() {
            axios
                .get(
                    `${BACKEND_API_URL}expression/notes?expt_id=${globalExperimentID}&expression_page=expression_heatmap`,
                    {
                        headers: {
                            'accept': 'application/json',
                            Authorization: `Bearer ${jwt}`,
                        }
                    }
                )
                .then((response) => {
                    // Handle successful response
                    setExpression_ExpressionHeatmap_Notes(response.data.notes);
                    //console.log("Expression Heatmap Notes : ", response.data.notes);
                })
                .catch((error) => {
                    // setisCountsNormalisationEmpty(true);
                    console.log("Error in Expression Heatmap Notes : ", error);
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

    }, [globalExperimentID])

    return (
        <div className="Note-Style" dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
}

export default Expression_ExpressionHeatmap_Notes_Comp;
