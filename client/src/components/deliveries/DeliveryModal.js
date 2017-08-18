import React, { Component } from 'react';

import { Modal, Button, FormControl } from 'react-bootstrap';

class DeliveryModal extends Component {
  componentWillMount(){
    this.setState({...this.props.delivery})
  }

  updateField = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  saveDelivery = (event) => {
    this.props.onSave(this.props.id, this.state)
  }

  onCancel = (event) => {
    this.props.hide();
  }

  static defaultProps = {
    delivery: {
      invoice_number: "",
      address: "",
      cod: "",
      phone_number: ""
    }
  }
  
  render() {
    return (
      <Modal show={true} onHide={this.onCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delivery</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
          <form onSubmit={this.saveDelivery}>
              <FormControl autoFocus id="invoice_number" value={this.state.invoice_number} 
                  onChange={this.updateField} placeholder="Invoice Number"/>
              <FormControl autoFocus id="cod" type="text" value={this.state.cod} 
                  onChange={this.updateField} placeholder="Cash On Delivery"/>
              <FormControl autoFocus id="address" type="text" value={this.state.address} 
                  onChange={this.updateField} placeholder="Address"/>
              <FormControl autoFocus id="phone_number" type="text" value={this.state.phone_number} 
                  onChange={this.updateField} placeholder="Phone Number"/>
          </form>
        </Modal.Body>
  
        <Modal.Footer>
          <Button onClick={this.saveDelivery}>Save</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default DeliveryModal