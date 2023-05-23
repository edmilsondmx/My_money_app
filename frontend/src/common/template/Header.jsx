import React from 'react';
import Navbar from './Navbar';

const Header = (props) => {
  return (
    <header className="main-header">
      <button className="logo button-link">
        <span className="logo-mini">
          <i className="fa fa-money"></i>
        </span>
        <span className="logo-lg">
          <b>
            {' '}
            <i className="fa fa-money me-2"></i> My
          </b>{' '}
          Money
        </span>
      </button>
      <nav className="navbar navbar-static-top flex-nowrap">
        <div className="d-flex w-100">
          <button className="sidebar-toggle button-link" data-toggle="offcanvas" />
        </div>
        <Navbar />
      </nav>
    </header>
  );
};

export default Header;
