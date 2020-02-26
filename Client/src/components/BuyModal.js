import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { purchaseStock, 
         // loadUserStockInfo 
       } from '../actions';



class BuyModal extends React.Component {

//resets the current stock reducer to null if the user cancels
  reset = () => {
    this.props.purchaseStock({
      ticker: null, 
      companyName: null, 
      open: 0, 
      close: 0, 
      latestPrice: 0,
      previousClose: 0,
      change: 0,
      shares: 0,
      total: 0 })
  }
// activated when the user hits "cancel" on the popup modal
  closeAndCancel = () => {
    this.props.handleClose();
  }
// activated when the user hits "confirm" on the popup modal.
// all the lines before the axios post are to prepare the information for an organized
// request to our backend to make it easier to parse and insert into the database.
// this includes making a date() item, calculating the cost to subtract from user cash etc
  closeAndConfirm = () => {
    let { stock } = this.props
    stock['symbol'] = stock.ticker
    const userId = localStorage.getItem('userId')

    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear()
   
    const databaseEntry = {
      user: [userId],
      transaction: ['BUY',
                    stock.ticker, 
                    stock.shares, 
                    stock.latestPrice, 
                    dd + '/' + mm + '/' + yyyy],
      stock: {ticker: stock.ticker,
              shares: stock.shares},
      cost: (stock.shares * stock.latestPrice).toFixed(2)
    }
    // sending to our backend to be inserted into mongo
    axios.post('/api/user/updateportfolio', {
        entry: databaseEntry
    }).then(() => {
      console.log("success")
    })
    window.location.reload(true)

    this.props.handleClose();
   } 
  //check if user has enough money to make this purchase
  checkCanBuy = () => {
    if (this.props.stock.total <= this.props.cash){
      return true
    }
    else {
      return false
    }
  }
  
  render() {
  //Modal that opens and is rendered on the condition of the user having enough funds
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
            {this.checkCanBuy() ? "Confirm Investment" : "Invalid"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          { this.checkCanBuy() ? 
           `Are you sure you want to buy 
             ${this.props.stock.shares} shares of 
             ${this.props.stock.ticker} for 
             $${this.props.stock.latestPrice}/share for a total of 
             $${(this.props.stock.latestPrice * this.props.stock.shares).toFixed(2)}?
           `
           : <div>You do not have enough cash to make this purchase</div>
          }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeAndCancel}>
              Cancel
            </Button>
            { this.checkCanBuy() ?
            <Button variant="primary" onClick={this.closeAndConfirm}>
              Confirm
            </Button> : null
            }
          </Modal.Footer>
        </Modal>
      </div>
   );
  }
}
// to bring in stock info from the reducer
const mapStateToProps = state => ({
  stock: state.stock
  //userStocks: state.userStocks,
  // session: state.session
})

const dispatch = {
  purchaseStock
  // loadUserStockInfo
}

export default connect(mapStateToProps, dispatch)(BuyModal);