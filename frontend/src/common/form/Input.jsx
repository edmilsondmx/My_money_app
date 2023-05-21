import React from 'react';

const Input = (props) => {
  return (
    <input
      {...props.input}
      className="form-control"
      placeholder={props.placeholder}
      type={props.type}
      readOnly={props.readOnly}
    />
  );
};

export default Input;
