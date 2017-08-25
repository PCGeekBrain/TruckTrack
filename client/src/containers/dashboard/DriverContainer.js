import React, { Component } from 'react';
import { connect } from 'react-redux';
// Actions
import { showModal, getUsers, deleteUser } from '../../actions/driver';
// Components
import Driver from '../../components/drivers/Driver';
import DriverModal from '../../components/drivers/DriverModal';
import { Button } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

class DriverContainer extends Component {
  componentWillMount(){
    this.props.getUsers();
  }

  show = (event, driver = {}) => {this.props.showModal(driver);}
  destroy = id => {this.props.deleteUser(id)}

  render(){
    const drivers = this.props.drivers.map((driver, index) => <Driver driver={driver} key={index} onEdit={this.show} onDestroy={this.destroy}/>)
    return (
      <div className="page-drivers">
        <h1 id="title">Drivers</h1>
        <Button className="create-route-btn" onClick={this.show} >
          Create Driver <FontAwesome name="plus"/>
        </Button>
        <div id="drivers-list">{drivers}</div>
        {this.props.showDriverModal && <DriverModal /> /* re render the route so that it updates*/}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    drivers: state.drivers.drivers,
    showDriverModal: state.drivers.showModal
  }
}

export default connect(mapStateToProps, { showModal, getUsers, deleteUser })(DriverContainer);
