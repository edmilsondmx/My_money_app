import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../auth/authActions';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  changeOpen(e) {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { name, email } = this.props.user;
    return (
      <div className="navbar-custom-menu px-2 me-3">
        <ul className="nav navbar-nav ">
          <li
            onMouseLeave={() => this.state.open && this.changeOpen()}
            className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}
          >
            <button
              onClick={() => this.changeOpen()}
              aria-expanded={this.state.open ? 'true' : 'false'}
              className="dropdown-toggle rounded button-link"
              data-toggle="dropdown"
            >
              <img src="http://lorempixel.com.br/160/160/" className="user-image" alt="User" />
              <span className="hidden-xs text-white">{name}</span>
            </button>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img src="http://lorempixel.com.br/160/160/" className="img-circle" alt="User" />
                <p>
                  {name}
                  <small>{email}</small>
                </p>
              </li>

              <li className="user-footer">
                <div className="pull-right">
                  <button onClick={this.props.logout} className="btn btn-default btn-flat rounded">
                    Sair
                  </button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.auth.user });
const mapDispatchToProps = (dispatch) => bindActionCreators({ logout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
