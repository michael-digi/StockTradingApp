import React from 'react';
import NavigationBar from './NavigationBar';
import Register from './Register';
import Login from './Login';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import './css/Register.css';

import { AuthRoute, ProtectedRoute } from "../utils/routeAuth";

class App extends React.Component {

//The main page of the app. The AuthRoute/ProtectedRoute is defined in utils/authroute.js
//It checks to see if a user is logged in and redirects them accoridingly
  render() {
    return (
      <div id = "app">
        <NavigationBar />
        <AuthRoute 
          path="/home" 
          exact component={Login} />
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


export default (App);
