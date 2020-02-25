import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { purchaseStock, changeUserStockInfo } from '../actions';



class BuyModal extends React.Component {

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

  closeAndCancel = () => {
    this.props.handleClose();
  }

  closeAndConfirm = () => {
    const { userStocks, stock } = this.props
    userStocks.cash -= stock.total
    userStocks.transactions.push(stock)
    console.log(userStocks, "this is userStocks")
    console.log(stock, "this is stock")
    if (stock.ticker in userStocks.stocks) {
      userStocks.stocks[stock.ticker] += parseInt(stock.shares)
    }
    else {
      userStocks.stocks[stock.ticker] = parseInt(stock.shares)
    }
    
    this.props.changeUserStockInfo({
      userStocks
    })
    this.props.handleClose();
   } 
  
  checkCanBuy = () => {
    if (this.props.stock.total <= this.props.userStocks.cash){
      return true
    }
    else {
      return false
    }
  }
  
  render() {
  
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

const mapStateToProps = state => ({
  stock: state.stock,
  userStocks: state.userStocks
})

const dispatch = {
  purchaseStock,
  changeUserStockInfo
}

export default connect(mapStateToProps, dispatch)(BuyModal);