import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { getStatusOptions, clearModal, submitRoute } from '../../actions/route';
import { getDrivers } from '../../actions/driver';
// Redux
import { connect } from 'react-redux';

class RouteModal extends Component {

  componentWillMount(){
    this.setState({...this.props.route});
    this.props.getStatusOptions();
    this.props.getDrivers();
  }

  updateField = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  hide = () => {
    this.props.clearModal();
  }

  onSave = (event) => {
    if (event) {event.preventDefault();}
    if (this.state.user_id){
      // submit the state and hide
      this.props.submitRoute(this.state);
      this.hide();
    } else {
      this.hide(); // TODO, Let user know this is not allowed
    }
    
  }

  render(){
    const status_options = this.props.status_options.map((status, index) => {
      return <option key={index} value={status}>{status}</option>
    });
    const driver_options = this.props.driver_options.map((driver, index) => {
      return <option key={index} value={driver.id}>{driver.username}</option>
    })
    console.log(this.state, this.props)
    return (
      <Modal show={true} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSave}>
            <FormControl autoFocus id="log_number" value={this.state.log_number}
              onChange={this.updateField} placeholder="Log number"/>
            <FormControl componentClass="select" id="status" value={this.state.status}
              onChange={this.updateField} placeholder="Status">
              {status_options}
            </FormControl>
            <FormControl componentClass="select" id="user_id" value={this.state.user_id ? this.state.user_id : 0}
              onChange={this.updateField} placeholder="Driver">
              <option disabled value={0}> -- select a driver -- </option>
              {driver_options}
            </FormControl>
            <FormControl componentClass="select" id="truck_id" value={this.state.truck_id}
              onChange={this.updateField} placeholder="Truck">
            </FormControl>
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
    status_options: state.routes.status_options,
    showModal: state.routes.showModal,
    driver_options: state.drivers.drivers,
    route: state.routes.active
  }
}

export default connect(mapStateToProps, { getStatusOptions, clearModal, submitRoute, getDrivers })(RouteModal)