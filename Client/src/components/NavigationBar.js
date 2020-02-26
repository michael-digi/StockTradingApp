import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Form } from 'react-bootstrap/';
import './css/navbar.css'

// NavBar that holds links to different parts of the site, with conditional rendering 
// login/register. The logout function will destroy the user's current session

class NavigationBar extends React.Component {

  state = {
    loggedIn: Boolean(localStorage.getItem('userId'))
  }
  
  logout = () => {
    if (this.state.loggedIn) {
      localStorage.setItem('userId', null)
      localStorage.clear()
      }
  }
  
  render() {
  return (
   <div>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/transactions">The Exchange</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/portfolio">Home</Nav.Link>
      <Nav.Link href="/transactions">Transactions</Nav.Link>
      <Nav.Link href="/portfolio">Buy/Portfolio</Nav.Link>
    </Nav>
    <Form inline>
        {this.state.loggedIn ? 
          <Nav.Link href="/login" id = "logoutButton" onClick = {this.logout} className="btn btn-primary"> Logout </Nav.Link> : 
          <>
          <Nav.Link href="/login" id = "loginButton" className="btn btn-primary"> Login </Nav.Link>
          <Nav.Link href="/register" id = "registerButton" className="btn btn-primary"> Register </Nav.Link> </>}
    </Form>
  </Navbar>
  </div>
 )
}}


export default (NavigationBar);