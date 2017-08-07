import React, { Component } from 'react';
import {FormGroup, FormControl, Alert, Button, Glyphicon} from 'react-bootstrap';
// Styles
import '../../styles/login/Login.css';

class Login extends Component {
  componentWillMount(){
    this.state = {username: "", password: "", validationState: null}
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state)
  }

  render(){
    return (
      <form id="login-form" onSubmit={this.handleSubmit}>
        <span id="error" className={this.props.error ? "show" : "hide"}>
          <Alert bsStyle="danger">{this.props.error}</Alert>
        </span>
        <FormGroup>
          <FormControl autoFocus id="username" name="username" placeholder="Username"
            type="text" value={this.state.username} onChange={this.handleChange}/>
          <FormControl autoFocus id="password" name="password" placeholder="Password"
            type="password" value={this.state.password} onChange={this.handleChange}/>
          <Button type="submit">Login</Button>
        </FormGroup>
      </form>
    );
  }
}

export default Login;