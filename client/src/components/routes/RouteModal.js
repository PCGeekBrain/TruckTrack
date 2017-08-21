import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { getStatusOptions, setShowModal } from '../../actions/route';
import { getDrivers } from '../../actions/driver';
// Redux
import { connect } from 'react-redux';

class RouteModal extends Component {
  componentWillMount(){
    this.props.getStatusOptions();
    this.props.getDrivers();
  }

  hide = () => {
    this.props.setShowModal(false);
  }

  render(){
    const status_options = this.props.status_options.map((status, index) => {
      return <option key={index} value={status}>{status}</option>
    });
    const driver_options = this.props.driver_options.map((driver, index) => {
      return <option key={index} value={driver.id}>{driver.username}</option>
    })
    return (
      <Modal show={this.props.showModal} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Route</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.onSave}>
            <FormControl autoFocus id="log_number" />
            <FormControl componentClass="select" id="status">
              {status_options}
            </FormControl>
            <FormControl componentClass="select" id="user_id">
              {driver_options}
            </FormControl>
            <FormControl componentClass="select" id="truck_id">
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
    driver_options: state.drivers.drivers
  }
}

export default connect(mapStateToProps, { getStatusOptions, setShowModal, getDrivers })(RouteModal)