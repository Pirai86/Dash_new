import React, { useContext } from "react";
import Samples_CountsNormalisation_Radio_Comp from "./Samples_CountsNormalisation_Radio_Comp";
import { Container, Col } from "react-bootstrap";
import { GlobalContext } from "../../Global";
import "../../../Styles/Samples_CountsNormalisation_Comp.css";

const Samples_CountsNormalisation_Control_Comp = () => {

  const { Samples_CountsNormalisation_Control_DataList, setSamples_CountsNormalisation_Control_DataSelection } = useContext(GlobalContext);

  const handleGroupChoiceChange = (value) => {
    setSamples_CountsNormalisation_Control_DataSelection(value);
  };


  return (
    <Container fluid>
      <Col md={4}>
        <div className="Samples_BoxPlot_Control_Container">
          <p className="text">Group Annotation</p>
          <div className="">
            <Samples_CountsNormalisation_Radio_Comp
              name="group"
              options={Samples_CountsNormalisation_Control_DataList.map((item) => ({
                label: item,
                value: item,
              }))}
              onChange={handleGroupChoiceChange}
            />
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default Samples_CountsNormalisation_Control_Comp;
