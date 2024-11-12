import { useContext, useEffect } from "react";
import { GlobalContext } from "../../Components/Global";

const ExpSetup_Metadata_Notes_Comp = () => {
    const { ExpSetup_Metadata_Notes } = useContext(GlobalContext);

    const formattedText = typeof ExpSetup_Metadata_Notes === 'string'
        ? ExpSetup_Metadata_Notes
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
        : '';

    return (
        <div className="Note-Style" dangerouslySetInnerHTML={{ __html: formattedText }} />
    );
}

export default ExpSetup_Metadata_Notes_Comp;
