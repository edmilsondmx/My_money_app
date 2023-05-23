import './auth.css';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Row from '../common/layout/Row';
import Grid from '../common/layout/Grid';
import Messages from '../common/msg/Messagens';
import Input from '../common/form/InputAuth';

import { login, signup } from './authActions';
import Loader from '../common/template/Loader';
import Logo from '../assets/my_money_app3.png';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMode: true,
      fieldPassword1: 'password',
      fieldPassword2: 'password',
    };
  }

  changeMode() {
    this.setState({ loginMode: !this.state.loginMode });
  }

  onSubmit(values) {
    const { login, signup } = this.props;
    this.state.loginMode ? login(values) : signup(values);
  }

  changeInputType(fieldName) {
    const fieldId = fieldName === 'password1' ? 'password1' : 'password2';
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
      field.type = 'text';
      if (fieldId === 'password1') {
        this.setState({ fieldPassword1: 'text' });
      } else {
        this.setState({ fieldPassword2: 'text' });
      }
    } else {
      field.type = 'password';
      if (fieldId === 'password1') {
        this.setState({ fieldPassword1: 'password' });
      } else {
        this.setState({ fieldPassword2: 'password' });
      }
    }
  }

  render() {
    const { loginMode } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div className="login-box">
        <div className="login-logo">
          <img src={Logo} alt="" className="img-fluid" />
        </div>
        <div className="login-box-body">
          <h3 className="text-center title"> BEM VINDO!</h3>
          <p className="message">
            {loginMode
              ? 'Entre e aproveite todos os benefícios!'
              : 'Cadastre-se agora e tenha acesso total ao nosso aplicativo.'}
          </p>
          <form onSubmit={handleSubmit((v) => this.onSubmit(v))}>
            <Field component={Input} type="input" name="name" placeholder="Nome" icon="user" hide={loginMode} />
            <Field component={Input} type="email" name="email" placeholder="E-mail" icon="envelope" />
            <Field
              component={Input}
              type="password"
              name="password"
              placeholder="Senha"
              icon={this.state.fieldPassword1 === 'password' ? 'eye-slash' : 'eye'}
              className="password"
              password={true}
              changeInputType={() => this.changeInputType('password1')}
              id="password1"
            />
            <Field
              component={Input}
              type="password"
              name="confirm_password"
              placeholder="Confirmar Senha"
              icon={this.state.fieldPassword2 === 'password' ? 'eye-slash' : 'eye'}
              hide={loginMode}
              className="password"
              password={true}
              changeInputType={() => this.changeInputType('password2')}
              id="password2"
            />
            <Row>
              <Grid cols="4">
                <button type="submit" className="btn btn-primary fs-5 px-4">
                  {loginMode ? 'Entrar' : 'Registrar'}
                </button>
              </Grid>
            </Row>
          </form>
          <br />
          <a onClick={() => this.changeMode()} className="message">
            {loginMode ? 'Novo usuário? Registrar aqui!' : 'Já é cadastrado? Entrar aqui!'}
          </a>
        </div>
        <Messages />
        <Loader />
      </div>
    );
  }
}

Auth = reduxForm({ form: 'authForm' })(Auth);
const mapDispatchToProps = (dispatch) => bindActionCreators({ login, signup }, dispatch);

export default connect(null, mapDispatchToProps)(Auth);
