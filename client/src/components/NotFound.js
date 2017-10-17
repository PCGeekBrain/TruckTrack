import React from 'react';
import { NavLink } from 'react-router-dom';
import TruckIcon from '../img/trucks.svg';

const NotFound = () =>
  <div id="page-404">
    <img id="pic-main-404" src={TruckIcon} alt="Truck Icon" />
    <h1>Sorry, it seems that this page does not exists.</h1>
    <p>Trying to track your <NavLink exact to="/">shipment</NavLink>?</p>
  </div>

export default NotFound;