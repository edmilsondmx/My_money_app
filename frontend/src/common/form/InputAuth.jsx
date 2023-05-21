import React from 'react';
import If from '../operador/If';

const InputAuth = (props) => {
  return (
    <If test={!props.hide}>
      <div className="form-group has-feedback">
        <input
          {...props.input}
          className="form-control input"
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          type={props.type}
          id={props.id}
        />
        <If test={!props.password}>
          <span className={`fa fa-${props.icon} form-control-feedback`}></span>
        </If>
        <If test={props.password}>
          <i onClick={props.changeInputType} className={`fa fa-${props.icon} form-control-feedback InputType`}></i>
        </If>
      </div>
    </If>
  );
};

export default InputAuth;
