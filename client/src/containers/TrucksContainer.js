import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadTrucks, showModal, deleteTruck} from '../actions/trucks';
import FontAwesome from 'react-fontawesome';

import Truck from '../components/trucks/Truck';
import TruckModal from '../components/trucks/TruckModal';
import { Button } from 'react-bootstrap';

import '../styles/trucks/truck.css';

class TruckContainer extends Component {
  componentWillMount() {
    this.props.loadTrucks();
  }

  create = event => this.showModalListener(event, {})
  destroy = id => this.props.deleteTruck(id);

  showModalListener = (event, truck = {}) => {
    event.preventDefault();
    this.props.showModal(truck);
  }

  render() {
    const trucks = this.props.trucks.map((truck, index) => <Truck key={index} truck={truck} onEdit={this.showModalListener} onDelete={this.destroy} />)
    return (
      <div className="page-trucks container">
        <h1 id="title">Trucks</h1>
        <Button className="create-route-btn" onClick={this.create}>
          Create Truck <FontAwesome name="plus"/>
        </Button>
        {trucks}
        {this.props.showTruckModal && <TruckModal />}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    trucks: state.trucks.list,
    showTruckModal: state.trucks.showModal
  }
}

export default connect(mapStateToProps, {loadTrucks, showModal, deleteTruck})(TruckContainer);