import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { submitUser, hideModal, getRoles } from '../../actions/user';
// Redux
import { connect } from 'react-redux';

class UserModal extends Component {

  componentWillMount(){
    if(!this.props.roles.length){
      this.props.getRoles();
    }
    this.setState({...this.props.user});
  }

  updateField = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  hide = () => {
    this.props.hideModal();
  }

  onSave = (event) => {
    if (event) {event.preventDefault();}
    this.props.submitUser(this.state);
    this.hide();   
  }

  render(){
    const roles = this.props.roles.map((role, index) => <option key={index} value={role}>{role}</option>)
    return (
      <Modal show={true} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Driver / User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSave}>
            <FormControl autoFocus id="username" value={this.state.username}
              onChange={this.updateField} placeholder="Username"/>
            <FormControl componentClass="select" id="role" value={this.state.role} onChange={this.updateField}>
              {roles}
            </FormControl>
            <FormControl id="email" value={this.state.email}
              onChange={this.updateField} placeholder="email"/>
              <hr/>
            <label>Set Password</label>
            <FormControl id="password" value={this.state.password}
              onChange={this.updateField} placeholder="password"/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.onSave}>Save User</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.users.user,
    roles: state.users.roles
  }
}

export default connect(mapStateToProps, { submitUser, hideModal, getRoles })(UserModal)