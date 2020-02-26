import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './css/Register.css';
import axios from 'axios'
import BuyModal from './BuyModal'
import { purchaseStock, loadUserStockInfo } from '../actions';

// this component holds the card that allows us to input a ticker and a number of
// shares and requests to buy

class BuyStocks extends React.Component {

// fetch data to be displayed (if there is any) when the component first mounts.
// in this case, it is just fetching the user's amount of cash from mongodb
  componentDidMount() {
    axios.get('/api/user/findUser', {
      params:  {
        id: String(localStorage.userId)
      }
    }).then(res => {
      this.setState({
        cash: res.data.cash
      })
    }).catch(error => console.log("No user to load"))
  }

  state = {
    ticker: '',
    shares: '',
    modalShow: false,
    loading: true,
    cash: '',
    error: ''
  }
// modalShow is a prop passed to the BuyModal to change its state from open/close close/open
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
// for when the user is typing into ticker or shares
  handleChange = (event) =>  {
    console.log(this.props)
    const { name, value } = event.target
      this.setState({
        [name]: value
    })
  }
// clear any errors
  clear = () => {
    this.setState({
      error: ''
    })
  }
// this is called when the user clicks "invest" after inputting a ticker and shares.
// it then queries the IEX API to get the info of the stock to be displayed, and also
// calls the purchaseStock action, which holds it in the reducer while the user chooses to
// cancel or invest. 
  buy = (req, res) => {
    this.setState({
      error: ''
    })
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
        this.setState({
          error: 'Please enter a valid ticker symbol and an amount of shares'
        })
      }
    })
    .catch(error => this.setState({
      error: 'Please enter a valid ticker symbol and an amount of shares'
    }))
  }

	render() {
    return (
        <Card>
          {this.state.cash ?
            `${'Cash: '}${this.state.cash.toFixed(2)}` :
              null }
          <Card.Body>
            <Form id = "ticker-form">
              <Form.Group controlId="formBasicText">
                <Form.Label>Ticker</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Ticker Lookup"
                    name = "ticker"
                    value = {this.state.ticker}
                    onChange = {this.handleChange}
                    onClick = {this.clear} />
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
                    cash = {this.state.cash}
                  />
                  <Button variant="primary" onClick={this.buy}>
                    Invest
                  </Button>
                <div style = {{color: 'red'}}>{this.state.error} </div>
            </Form>
          </Card.Body>
        </Card>
      )
  }
}

const mapStateToProps = state => ({
  session: state.session,
  stock: state.stock,
  userStocks: state.userStocks
})

const actionCreators = {
  purchaseStock,
  loadUserStockInfo,
}


export default connect(mapStateToProps, actionCreators)(BuyStocks);