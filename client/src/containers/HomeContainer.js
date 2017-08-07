import React, {Component} from 'react';
import {connect} from 'react-redux';
// Components
import Delivery from '../components/home/Delivery';
import Searchbar from '../components/home/Searchbar';
// Actions
import { getResults } from '../actions/home'
// Styles
import '../styles/home/index.css'

class HomeContainer extends Component {
  render(){
    const deliveries = this.props.deliveries.map((delivery, index) => <Delivery key={index} {...delivery}/>)
    return (
      <div className="page-home container">
        {/* <Col md={12}> */}
          <h1 id="title">Track Shipment</h1>
          <Searchbar options={["invoice", "tracking"]} onSubmit={this.props.getResults}/>
        {/* </Col> */}
        <ul id="deliveries">
          {deliveries.length ? deliveries : <span id="not_found">No Records Found</span>}
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
export default connect(mapStateToProps, { getResults })(HomeContainer)