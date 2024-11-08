import { useState } from "react";
import "../Styles/DropDownComboBox.css";
import DownArrow from "../assets/down-arrow.svg";

function DropDownComboBox() {

    const [DropDownClicked, setDropDownClicked] = useState(false);
    

    const list = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

    const [SelectedValue, setSelectedValue] = useState(list[0]);

    const handleDropDownClick = () => {
        setDropDownClicked(!DropDownClicked);
    }


    return (
        <div className="DropDownComboBox">
            <div className={`DropDown-Container ${DropDownClicked ? "clicked" : ""}`} onClick={() => handleDropDownClick()}>
                <div className="">
                    <p>{SelectedValue}</p>
                </div>
                <img className="Combo-DownArrow-Img" src={DownArrow} alt="" />
            </div>
            <div className={`DropDown-List-Container ${DropDownClicked ? "clicked" : ""}`} onClick={() => handleDropDownClick()}>
                <ul>
                    {
                        list.map((lists, index) =>
                            <li key={index} onClick={()=>setSelectedValue(list[index])}>
                                {lists}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default DropDownComboBox;