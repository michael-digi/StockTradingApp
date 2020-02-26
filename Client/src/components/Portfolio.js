import React from 'react';
import { connect } from 'react-redux';
import BuyStocks from './BuyStocks';
import axios from 'axios'
import { purchaseStock, loadUserStockInfo } from '../actions';

class Portfolio extends React.Component {
 
render() {
    return (
      <div style = {{height: '100%'}}>
      <BuyStocks />
      </div>
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
  loadUserStockInfo
}


export default connect(mapStateToProps, actionCreators)(Portfolio);