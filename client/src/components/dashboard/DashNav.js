import React from 'react';
// Components used
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FontAwesome from 'react-fontawesome';

// Wrapper for links on the navbar to make them work with react router
const NavItemLink = (props) => {
  return (
    <LinkContainer {...props}>
      <NavItem>{props.children}</NavItem>
    </LinkContainer>
  );
}

const DashNav = ({logOut}) => {
  return (
    <Navbar collapseOnSelect fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <NavLink exact to="/dashboard">
            <strong><FontAwesome name="truck"/> Truck</strong>Track
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItemLink exact to="/">
            Track Package <FontAwesome name="archive"/>
          </NavItemLink>
          <NavItemLink to="/dashboard/routes">
            Routes <FontAwesome name="map"/>
          </NavItemLink>
          <NavItemLink to="/dashboard/trucks">
            Trucks <FontAwesome name="truck"/>
          </NavItemLink>
          <NavItemLink to="/dashboard/drivers">
            Drivers <FontAwesome name="users"/>
          </NavItemLink>
          <NavItem onClick={logOut}>
            Log Out <FontAwesome name="sign-out"/>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default DashNav;
