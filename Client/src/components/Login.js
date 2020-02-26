import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { validateEmail } from './componentHelpers'
import './css/Register.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { receiveCurrentUser } from '../actions';

// this is the login page, it will first make sure the user entered a valid email on their end.
// it will then check to see if there was a userId in the response from the API, which received
// a response from the user database. If there was, start a session. If not, output an error

class Login extends React.Component  {
  state = {
    email: '',
    password: '',
    loggedIn: Boolean(localStorage.getItem('userId')),
    emailError: ''
  }

  handleChange = (event) =>  {
    const { name, value } = event.target
      this.setState({
        [name]: value
    })
  }

  login = () => {
    let validEmail = validateEmail(this.state.email)
    if (validEmail === false) {
      this.setState({
        emailError: 'Please enter a valid email'
      })
      return
    }
    axios.post('api/session/login', {
          email: this.state.email,
          password: this.state.password
    })
    .then(res => {
       if (res.data.userId) {
         this.props.receiveCurrentUser(res.data)
         localStorage.setItem('userId', res.data.userId)
         window.location.reload()
       }
       else {
         this.setState({
           emailError: 'Username or Password incorrect'
         })
       }
    })
  }

  render() {
    return (
      <Container id = "register-container">
        <Row>
          <Col sm = {{ span: 6, offset: 3 }}>
            <Card>
            <h2> Sign In </h2>
              <Card.Body>
                <Form id = "register-form">
                  
                  <Form.Group controlId="formBasicEmail">
                  <div style = {{color: 'red'}} >{this.state.emailError}</div>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter email"
                      name = "email"
                      value = {this.state.email}
                      onChange = {this.handleChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder = 'Password' 
                      name = "password"
                      autoComplete="new-password" 
                      value = {this.state.password}
                      onChange = {this.handleChange} />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="button" 
                    onClick = {this.login}>
                      Submit
                  </Button>
                  
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}


const actionCreators = {
  receiveCurrentUser
}

export default connect(null, actionCreators)(Login);