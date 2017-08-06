import React, {Component} from 'react';
import {connect} from 'react-redux';
// Components
import Delivery from '../components/home/Delivery'
import Searchbar from '../components/home/Searchbar'
import {} from 'react-bootstrap';
// Styles

class HomeContainer extends Component {
  render(){
    const deliveries = this.props.deliveries.map(delivery => <Delivery {...delivery}/>)
    return (
      <div className="page-home container">
        <h1 id="title">Track Shipment</h1>
        <Searchbar />
        <ul id="deliveries">
          {deliveries}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return {
    deliveries: state.home
  }
}
export default connect(mapStateToProps)(HomeContainer)