import React from 'react';
import { Route } from "react-router-dom";
import NavigationBar from './NavigationBar';
import Register from './Register';
import Login from './Login';
import BuyStocks from './BuyStocks';
import Portfolio from './Portfolio';
import Transactions from './Transactions';
import './css/Register.css';
import { AuthRoute, ProtectedRoute } from "../utils/routeAuth";

function App() {
  return (
    <div id = "app">
      <NavigationBar />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/buystocks" exact component={BuyStocks} />
      <Route path="/transactions" exact component={Transactions} />
      <Route path="/portfolio" exact component={Portfolio} />
      <Route path="/home" />
    </div>
  );
}

export default App;
