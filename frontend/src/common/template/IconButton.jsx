import React from 'react';

const IconButton = (props) => {
  return (
    <button type="button" className={'me-1 btn btn-' + props.color} onClick={props.onClick}>
      <i className={'fa fa-' + props.icon}></i>
    </button>
  );
};

export default IconButton;
