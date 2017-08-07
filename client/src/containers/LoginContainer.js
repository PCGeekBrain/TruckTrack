import React, { Component } from 'react';
import {connect} from 'react-redux';
// Components
import Login from '../components/login/Login';
// Actions
import {login} from '../actions/login';
// Styles

class LoginContainer extends Component {
  render() {
    return (
      <div className="page-login container">
        <h1 id="title">Login</h1>
        <Login error={this.props.error} onSubmit={this.props.login} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.login.error
  }
}

export default connect(mapStateToProps, {login})(LoginContainer);