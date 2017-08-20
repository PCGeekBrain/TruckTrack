import React, { Component } from 'react';
// Components
import { Modal, Button, FormControl } from 'react-bootstrap';
// Actions
import { getStatusOptions, setShowModal } from '../../actions/route'
// Redux
import { connect } from 'react-redux';

class RouteModal extends Component {
  componentWillMount(){
    this.props.getStatusOptions()
  }

  hide = () => {
    this.props.setShowModal(false);
  }

  render(){
    const status_options = this.props.status_options.map((status, index) => {
      return <option key={index} value={status}>{status}</option>
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
    showModal: state.routes.showModal
  }
}

export default connect(mapStateToProps, { getStatusOptions, setShowModal })(RouteModal)