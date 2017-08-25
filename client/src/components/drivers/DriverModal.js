import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { submitUser, hideModal } from '../../actions/driver';
// Redux
import { connect } from 'react-redux';

class DriverModal extends Component {

  componentWillMount(){
    this.setState({...this.props.driver});
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
    return (
      <Modal show={true} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Driver / User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSave}>
            <FormControl autoFocus id="username" value={this.state.username}
              onChange={this.updateField} placeholder="Username"/>
            <FormControl id="password" value={this.state.password}
              onChange={this.updateField} placeholder="password"/>
            <FormControl id="email" value={this.state.email}
              onChange={this.updateField} placeholder="email"/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.onSave}>Save Route</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    driver: state.drivers.driver
  }
}

export default connect(mapStateToProps, { submitUser, hideModal })(DriverModal)