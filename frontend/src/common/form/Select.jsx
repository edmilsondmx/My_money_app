import React from 'react';

const Select = (props) => {
  return <select {...props.select} readOnly={props.readOnly} className="form-select"></select>;
};

export default Select;
