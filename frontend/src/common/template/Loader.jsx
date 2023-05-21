import React from 'react';
import { connect } from 'react-redux';
import './Loader.css';
import If from '../operador/If';

const Loader = (props) => {
  return (
    <If test={props.loader}>
      <div className="loader">
        <span>$</span>
        <span>$</span>
      </div>
    </If>
  );
};

const mapStateToProps = (state) => ({ loader: state.auth.loader });

export default connect(mapStateToProps)(Loader);
