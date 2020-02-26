import React from 'react';
import NavigationBar from './NavigationBar';
import Register from './Register';
import Login from './Login';
import BuyStocks from './BuyStocks';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import { connect } from 'react-redux';
import axios from 'axios';
import { receiveCurrentUser, 
         logoutCurrentUser,
         loadUserStockInfo,
         switchLoading } from '../actions';
import './css/Register.css';

import { AuthRoute, ProtectedRoute } from "../utils/routeAuth";


class App extends React.Component {

  componentDidMount() {
    let loadedUserInfo = {};
    let tickers, entries, data;
    console.log("WHEEEEEEE")
    this.props.switchLoading(true)
    axios.get('/api/user/findUser', {
      params:  {
        id: this.props.session.userId
      }
    }).then(res => {
      console.log(res, " res1")
        let cash = res.data.cash
        loadedUserInfo['cash'] = (res.data.cash)
        loadedUserInfo['transactions'] = res.data.transactions
        loadedUserInfo['stocks'] = res.data.stocks
        this.props.loadUserStockInfo(loadedUserInfo)
    }).then(() => {
    axios.get('/api/user/userStocks', {
      params: {
        id: this.props.session.userId
      }
    })
     .then(res => {
       console.log(res, " res3")
        data = res.data
        tickers = Object.keys(res.data)
        entries = Object.entries(res.data)
    }).then(() => {
        axios.get('api/stocks/batchinfo', {
          params: {
            tickers: tickers,
            entries: entries
          }
    }).then(res => {
      console.log(res, " res5")
         for (let i = 0; i < res.data.length; i++) {
           (res.data[i]['shares'] = data[res.data[i].symbol])
         }
         this.props.loadUserStockInfo({
           stocks: res.data,
           transactions: this.props.userStocks.transactions,
           cash: this.props.userStocks.cash
         })
      }).then(() => {
        this.props.switchLoading(false)
       })
       .catch(error => console.log("Please try"))
    })
   })
}
  render() {
    return (
      <div id = "app">
        <NavigationBar />
        <AuthRoute 
          path="/register" 
          exact component={Register} />
        <AuthRoute 
          path="/login" 
          exact component={Login} />
        <ProtectedRoute 
          path="/transactions"  
          exact component={Transactions} />
        <ProtectedRoute 
          path="/portfolio" 
          exact component={Portfolio} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session,
  userStocks: state.userStocks,
  stock: state.stock,
  loading: state.loading
});

const actionCreators = {
  receiveCurrentUser, 
  logoutCurrentUser,
  loadUserStockInfo,
  switchLoading
}

export default connect(mapStateToProps, actionCreators)(App);
