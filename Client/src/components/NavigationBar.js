import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Form } from 'react-bootstrap/';
import { connect } from 'react-redux';
import { receiveCurrentUser, logoutCurrentUser } from '../actions';
import axios from 'axios';
import './css/navbar.css'

class NavigationBar extends React.Component {
  
  logout = () => {
    console.log(this.props)
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
      <Nav.Link href="/portfolio">Buy/Portfolio</Nav.Link>
    </Nav>
    <Form inline>
        {this.props.session.userId ? 
          <Nav.Link href="/login" id = "logoutButton" onClick = {this.logout} className="btn btn-primary"> Logout </Nav.Link> : 
          <>
          <Nav.Link href="/login" id = "loginButton" className="btn btn-primary"> Login </Nav.Link>
          <Nav.Link href="/register" id = "registerButton" className="btn btn-primary"> Register </Nav.Link> </>}
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