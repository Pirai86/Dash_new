import React from 'react';
import PropTypes from 'prop-types';
import { components } from 'react-select';

const Expression_GeneExpression_Option_Comp = ({ children, ...props }) => {
  // eslint-disable-next-line no-unused-vars
  const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
  const newProps = { ...props, innerProps: rest };
  return (
    <components.Option {...newProps} className="custom-option">
      {children}
    </components.Option>
  );
};

Expression_GeneExpression_Option_Comp.propTypes = {
  innerProps: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Expression_GeneExpression_Option_Comp;
