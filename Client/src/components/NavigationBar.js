import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
  return (
   <Navbar bg="dark" variant = "dark" expand="md">
     <Navbar.Brand href="#home">The Exchange</Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/transactions">Transactions</Nav.Link>
      <Nav.Link href="/buystocks">Buy/Portfolio</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  )
}

export default NavigationBar;