import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/Register.css';
import axios from 'axios'
import { connect } from 'react-redux';
import { receiveCurrentUser, logoutCurrentUser } from '../actions';


class Register extends React.Component  {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  handleChange = (event) =>  {
    const { name, value } = event.target
      this.setState({
        [name]: value
    })
  }

  checkSession = async () => {
    axios.get('api/session/check')
      .then(res => {
        if (res.data.userId) {
          console.log(res.data)
        }
        else {
          console.log("nuthin")
        }
      })
  }

  
  register = () => {
      axios.post('api/user/register', {
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
      })
       .then(res =>  {
         console.log(res.data)
         this.props.receiveCurrentUser(res.data)}
         )
       .catch(error => console.log(error.response))
    }

  render() {
    return (
      <Container id = "register-container">
        <Row>
          <Col sm = {{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <Form id = "register-form">
                  <Form.Group controlId="formBasicEmail">
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
        {console.log(this.props)}
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