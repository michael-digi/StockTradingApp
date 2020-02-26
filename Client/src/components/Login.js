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


class Login extends React.Component  {
  state = {
    email: '',
    password: ''
  }

  handleChange = (event) =>  {
    const { name, value } = event.target
    console.log(name, value)
      this.setState({
        [name]: value
    })
  }

  login = () => {
    console.log(this.state.email)
    console.log(this.state.password)
    axios.post('api/session/login', {
          email: this.state.email,
          password: this.state.password
    })
    .then(res => {
       this.props.receiveCurrentUser(res.data)
       window.location.reload(true)
     })
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

export default connect(mapStateToProps, actionCreators)(Login);