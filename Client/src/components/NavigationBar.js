import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Button, Form, FormControl } from 'react-bootstrap/';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { receiveCurrentUser, logoutCurrentUser } from '../actions';
import axios from 'axios';



class NavigationBar extends React.Component {
  
  logout = () => {
    if (this.props.session) {
      axios.get('api/session/logout')
        .then(() => {
          this.props.logoutCurrentUser()
        })
      }
  }
  
  render() {
  return (
   <div>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/transactions">The Exchange</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/transactions">Transactions</Nav.Link>
      <Nav.Link href="/buystocks">Buy/Portfolio</Nav.Link>
    </Nav>
    <Form inline>
      <Button variant="outline-info" onClick = {this.logout}>
        {this.props.session.userId ? 'Logout' : 'Login'}
      </Button>
    </Form>
  </Navbar>
  </div>
 )
}}

const mapStateToProps = state => ({
  session: state.session
});

const actionCreators = {
  receiveCurrentUser, 
  logoutCurrentUser
}

export default connect(mapStateToProps, actionCreators)(NavigationBar);