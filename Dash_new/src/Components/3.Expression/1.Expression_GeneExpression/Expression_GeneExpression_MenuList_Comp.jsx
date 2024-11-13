import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';

const DefaultItemHeight = 40;

const Expression_GeneExpression_MenuList_Comp = ({ options, children, maxHeight, getValue }) => {
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * DefaultItemHeight;
  const childrenArray = React.Children.toArray(children);
  const wrapperHeight = maxHeight < childrenArray.length * DefaultItemHeight
    ? maxHeight
    : childrenArray.length * DefaultItemHeight;

  return (
    <div className="react-window-list-wrapper">
      <List
        height={wrapperHeight}
        itemCount={childrenArray.length}
        itemSize={DefaultItemHeight}
        initialScrollOffset={initialOffset}
        width="100%"
      >
        {({ index, style }) => (
          <div style={style} key={index}>
            {childrenArray[index]}
          </div>
        )}
      </List>
    </div>
  );
};

Expression_GeneExpression_MenuList_Comp.propTypes = {
  options: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.number.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default Expression_GeneExpression_MenuList_Comp;
