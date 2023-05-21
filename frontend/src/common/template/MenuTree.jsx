import React from 'react';
import { Link } from 'react-router-dom';

const MenuTree = (props) => {
  return (
    <li className="treeview nav-item">
      <Link to="/" className="nav-link">
        <i className={`fa fa-${props.icon}`}></i>
        <span>{props.label}</span>
        <i className="fa fa-angle-left pull-right"></i>
      </Link>
      <ul className="treeview-menu">{props.children}</ul>
    </li>
  );
};

export default MenuTree;
