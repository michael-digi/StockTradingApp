import React from 'react';
import { Route } from "react-router-dom";
import NavigationBar from './NavigationBar';
import Register from './Register';
import Login from './Login';
import BuyStocks from './BuyStocks';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import axios from 'axios';
import { connect } from 'react-redux';
import { receiveCurrentUser, logoutCurrentUser } from '../actions';

import './css/Register.css';
import { AuthRoute, ProtectedRoute } from "../utils/routeAuth";


class App extends React.Component {
  
  
  render() {
    return (
      <div id = "app">
      {console.log(this.props)}
        <NavigationBar />
        <AuthRoute path="/register" exact component={Register} />
        <AuthRoute path="/login" exact component={Login} />
        <ProtectedRoute path="/buystocks" exact component={BuyStocks} />
        <ProtectedRoute path="/transactions" exact component={Transactions} />
        <ProtectedRoute path="/portfolio" exact component={Portfolio} />
      </div>
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

export default connect(mapStateToProps, actionCreators)(App);
