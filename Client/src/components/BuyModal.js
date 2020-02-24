import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { purchaseStock } from '../actions';


class BuyModal extends React.Component {

  closeAndCancel = () => {
    this.props.handleClose();
    this.props.purchaseStock({ticker: '', 
                              price: 0, 
                              shares: 0})}
  checkCanBuy = () => {
    if ((this.props.stock.price * 
         this.props.stock.shares).toFixed(2) <= this.props.userStocks.cash){
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
            <Modal.Title>Confirm Investment</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          { this.checkCanBuy() ? 
           `Are you sure you want to buy 
             ${this.props.stock.shares} shares of 
             ${this.props.stock.ticker} for 
             $${this.props.stock.price}/share for a total of 
             $${(this.props.stock.price * this.props.stock.shares).toFixed(2)}?
           `
           : <div>You do not have enough cash to make this purchase</div>
          }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeAndCancel}>
              Cancel
            </Button>
            { this.checkCanBuy() ?
            <Button variant="primary" onClick={this.props.closeAndConfirm}>
              Confirm
            </Button> : null
            }
          </Modal.Footer>
        </Modal>
        {console.log(this.props.stock)}
      </div>
   );
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  userStocks: state.userStocks
})

const dispatch = {
  purchaseStock
}

export default connect(mapStateToProps, dispatch)(BuyModal);