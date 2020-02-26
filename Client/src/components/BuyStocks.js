import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from './DataTable';
import Loading from './Loading';
import './css/Register.css';
import axios from 'axios'
import BuyModal from './BuyModal'
import { purchaseStock, loadUserStockInfo } from '../actions';


class BuyStocks extends React.Component {

  
  state = {
    ticker: '',
    shares: '',
    modalShow: false,
    loading: true
  }

  handleClose = () => {
    this.setState({
      modalShow: false
    })
  }
  
  handleShow = () => {
    this.setState({ 
      modalShow: true
    })
  }
  handleChange = (event) =>  {
    const { name, value } = event.target
      this.setState({
        [name]: value
    })
  }

  buy = (req, res) => {
    axios.get('api/stocks/info', {
      params: {
        ticker: this.state.ticker
      }
    })
    .then(res => {
      const total = (parseFloat(this.state.shares) * 
                     parseFloat(res.data.latestPrice)).toFixed(2)
      res.data['shares'] = this.state.shares
      res.data['total'] = total
      this.props.purchaseStock(res.data)
      if (res.data.ticker && res.data.latestPrice && this.state.shares) {
        this.handleShow()
        this.setState({
          ticker: '',
          shares: ''
       })
      }
      else {
        console.log('Error')
      }
    })
    .catch(error => console.log(error, "this is error"))
  }

	render() {
    return (
    
      <Container id = "ticker-container">
        <Row>
          <Col sm = {{ span: 8 }}>
            <DataTable />
          </Col>
          <Col sm = {{ span: 3, offset: 1}}>
            <Card>
            {this.props.userStocks.cash ?
              this.props.userStocks.cash.toFixed(2) :
              null}
              <Card.Body>
                
                <Form id = "ticker-form">
                  <Form.Group controlId="formBasicText">
                    <Form.Label>Ticker</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Ticker Lookup"
                      name = "ticker"
                      value = {this.state.ticker}
                      onChange = {this.handleChange} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicText">
                    <Form.Label>Shares</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder = 'Shares' 
                      name = "shares"
                      autoComplete="off"
                      value = {this.state.shares}
                      onChange = {this.handleChange} />
                  </Form.Group>
                  <BuyModal 
                    handleShow = {this.handleShow}
                    handleClose = {this.handleClose}
                    show = {this.state.modalShow}
                  />
                  <Button variant="primary" onClick={this.buy}>
                    Invest
                  </Button>
                </Form>
              
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  session: state.session,
  stock: state.stock,
  userStocks: state.userStocks,
  loading: state.loading
})

const actionCreators = {
  purchaseStock,
  loadUserStockInfo,
}


export default connect(mapStateToProps, actionCreators)(BuyStocks);