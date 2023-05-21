import React from 'react';
import Grid from '../layout/Grid';

const LabelAndInput = (props) => {
  return (
    <Grid cols={props.cols}>
      <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input
          {...props.input}
          className="form-control"
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          type={props.type}
        />
      </div>
    </Grid>
  );
};

export default LabelAndInput;
