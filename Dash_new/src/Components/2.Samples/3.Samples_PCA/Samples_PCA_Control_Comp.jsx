import React, { useContext } from 'react';
import Samples_PCA_Radio_Comp from './Samples_PCA_Radio_Comp';
import { GlobalContext } from "../../Global";
import { Container, Row, Col } from "react-bootstrap";
import choiceList from '../../../data/pca/choice_list.json';

function Samples_PCA_Control_Comp() {

  const { Samples_PCA_GroupChoice_List } = useContext(GlobalContext);

  const { setSamples_PCA_CorrectionChoice } = useContext(GlobalContext);
  const { setSamples_PCA_GeneChoice } = useContext(GlobalContext);
  const { setSamples_PCA_GroupChoice } = useContext(GlobalContext);
  const { setSamples_PCA_PlotTypeChoice } = useContext(GlobalContext);

  const correctionChoiceList = choiceList.correction_list;
  const geneChoiceList = choiceList.gene_list;
  const plotTypeChoiceList = choiceList.plottype_list;

  return (
    <div className="Samples_BoxPlot_Control_Container">
      <p className="text">Batch correction</p>
      <Samples_PCA_Radio_Comp
        name="correction"
        options={correctionChoiceList.map(item => ({ label: item, value: item }))}
        onChange={setSamples_PCA_CorrectionChoice}
      />

      <p className='text'>Group Annotation</p>
      <Samples_PCA_Radio_Comp
        name="group"
        options={Array.isArray(Samples_PCA_GroupChoice_List) ? Samples_PCA_GroupChoice_List.map(item => ({ label: item, value: item })) : []}
        onChange={setSamples_PCA_GroupChoice}
      />

      <p className='text'>Top variance genes</p>
      <Samples_PCA_Radio_Comp
        name="gene"
        options={geneChoiceList.map(item => ({ label: item, value: item }))}
        onChange={setSamples_PCA_GeneChoice}
      />

      <p className='text'>PC plotType:</p>
      <Samples_PCA_Radio_Comp
        name="plotType"
        options={plotTypeChoiceList.map(item => ({ label: item, value: item }))}
        onChange={setSamples_PCA_PlotTypeChoice}
      />

    </div>

  );
}

export default Samples_PCA_Control_Comp;
