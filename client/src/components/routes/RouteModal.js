import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { getStatusOptions, clearModal, submitRoute } from '../../actions/route';
import { getDrivers } from '../../actions/driver';
import { loadTrucks } from '../../actions/trucks';
// Redux
import { connect } from 'react-redux';

class RouteModal extends Component {

  componentWillMount(){
    this.setState({...this.props.route});

    // if any of these are not set
    if(!this.props.status_options.length || 
        !this.props.driver_options.length || 
        !this.props.truck_options.length)
    {
      // load them all
      this.props.getStatusOptions();
      this.props.getDrivers();
      this.props.loadTrucks();
    }
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
    const truck_options = this.props.truck_options.map((truck, index) => {
      return <option key={index} value={truck.id}>{truck.name}</option>
    })
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
            <FormControl componentClass="select" id="truck_id" value={this.state.truck_id ? this.state.truck_id : 0}
              onChange={this.updateField} placeholder="Truck">
              <option disabled value={0}> -- select a truck -- </option>
              {truck_options}
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
    driver_options: state.drivers.drivers,
    truck_options: state.trucks.list,
    route: state.routes.active
  }
}

export default connect(mapStateToProps, { getStatusOptions, clearModal, submitRoute, getDrivers, loadTrucks })(RouteModal)