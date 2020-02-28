import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { validateEmail, validatePassword } from './componentHelpers'
import './css/Register.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { receiveCurrentUser, logoutCurrentUser } from '../actions';

// this allows the user to register. It will validate the correct email with a regex,
// and will do the same for a password (at least 8 characters, at least one letter and one number)
// it will then check to see if the user is already in the database but email and return a conflict
// if so.

class Register extends React.Component  {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    error: '',
    passwordError: '',
    emailError: '',
    nameError: ''
  }

  handleChange = (event) =>  {
    const { name, value } = event.target
      this.setState({
        [name]: value
    })
  }

  register = () => {
    let validEmail = validateEmail(this.state.email)
    let validPassword = validatePassword(this.state.password)
    
    if (validEmail === false) {
      this.setState({
        emailError: 'Please enter a valid email'
      })
      return
    }
    if (validPassword === false) {
      this.setState({
        passwordError: 'Password must be 8 - 15 characters and contain' +
                       'at least one letter, one number, and one special character'
      })
      return
    }
    if (!this.state.firstName || !this.state.lastName) {
      this.setState({
        nameError: 'Please enter your full name'
      })
      return
    }
    this.setState({
        emailError: '',
        passwordError: '',
        nameError: ''
      })
    axios.post('api/user/register', {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
      })
       .then(res =>  {
         this.setState({
           emailError: '',
           passwordError: ''
         })
         this.props.receiveCurrentUser(res.data)
         localStorage.setItem('userId', res.data.userId)
         window.location.reload()
       }
         )
       .catch(() => {
         this.setState({
           emailError: "This user already exists"
         })
       })
    }

  render() {
    return (
      <Container id = "register-container">
        <Row>
          <Col sm = {{ span: 6, offset: 3 }}>
            <Card>
            <h2> Sign Up </h2>
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
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicFirstName">
                  <div style = {{color: 'red'}} >{this.state.nameError}</div>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder = 'First Name'
                      name = "firstName"
                      value = {this.state.firstName}
                      onChange = {this.handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder = 'Last Name' 
                      name = "lastName"
                      value = {this.state.lastName}
                      onChange = {this.handleChange} />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                  <div style = {{color: 'red'}} >{this.state.passwordError}</div>
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
                    onClick = {this.register}>
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

const mapStateToProps = state => ({
  session: state.session
});

const actionCreators = {
  receiveCurrentUser, 
  logoutCurrentUser
}

export default connect(mapStateToProps, actionCreators)(Register);