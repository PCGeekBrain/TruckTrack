import React, {Component} from 'react';
import {connect} from 'react-redux';
// Components
import Delivery from '../components/home/Delivery';
import Searchbar from '../components/home/Searchbar';

import { getResults } from '../actions/home'
// Styles
import '../styles/home/index.css'

class HomeContainer extends Component {
  render(){
    const deliveries = this.props.deliveries.map(delivery => <Delivery {...delivery}/>)
    return (
      <div className="page-home container">
        <h1 id="title">Track Shipment</h1>
        <Searchbar options={["invoice", "tracking"]} onSubmit={this.props.getResults}/>
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
export default connect(mapStateToProps, {getResults})(HomeContainer)