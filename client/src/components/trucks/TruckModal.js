import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { submitTruck, hideModal } from '../../actions/trucks';
// Redux
import { connect } from 'react-redux';

class TruckModal extends Component {

  componentWillMount(){
    this.setState({...this.props.truck});
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
    this.props.submitTruck(this.state);
    this.hide();
  }

  render(){
    return (
      <Modal show={true} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSave}>
            <FormControl autoFocus id="name" value={this.state.name}
              onChange={this.updateField} placeholder="Name*"/>
            <FormControl id="licence" value={this.state.licence}
              onChange={this.updateField} placeholder="Licence Plate"/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.onSave}>Save Truck</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    truck: state.trucks.truck
  }
}

export default connect(mapStateToProps, { submitTruck, hideModal })(TruckModal)