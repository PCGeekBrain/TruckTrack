import React from 'react';
import {connect} from 'react-redux';
// Components
import Login from '../components/login/Login';
import { Redirect } from 'react-router';
// Actions
import { login } from '../actions/login';
// Styles

const LoginContainer = ({error, login, logged_in}) => {
  if (logged_in){
    return <Redirect to="/dashboard"/>
  }
  return (
    <div className="page-login container">
      <h1 id="title">Login</h1>
      <Login error={error} onSubmit={login} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    error: state.login.error,
    logged_in: state.login.logged_in
  }
}

export default connect(mapStateToProps, {login})(LoginContainer);