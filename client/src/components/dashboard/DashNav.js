import React from 'react';
// Components used
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

// Wrapper for links on the navbar to make them work with react router
const NavItemLink = (props) => {
  return (
    <LinkContainer {...props}>
      <NavItem>{props.children}</NavItem>
    </LinkContainer>
  );
}

const DashNav = () => {
  return (
    <Navbar collapseOnSelect fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink exact to="/dashboard">
            <strong>Truck</strong>Track
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItemLink exact to="/">Track Package</NavItemLink>
          <NavItemLink to="/dashboard/routes">Routes</NavItemLink>
          <NavItemLink to="/dashboard/trucks">Trucks</NavItemLink>
          <NavItemLink to="/dashboard/drivers">Drivers</NavItemLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DashNav
