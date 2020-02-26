import React from 'react';
import axios from 'axios';
import { loadUserStockInfo } from '../actions'
import { connect } from 'react-redux';
import 'react-table-v6/react-table.css';
import './css/Table.css'

class DataTable extends React.Component {

  renderRows = () => {
    let rows = []
    let net;
    let { stocks }  = this.props.userStocks
    let color = ''
    console.log(color)
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].open && stocks[i].close) {
        net = stocks[i].close - stocks[i].open
      }
      else {
        net = stocks[i].latestPrice - stocks[i].previousClose
      }
      if (net == 0){
        color = 'gray'
      }
      if (net > 0) {
        color = 'lightgreen'
      }
      if (net < 0) {
        color = 'red'
      }
      rows.push(
        <tr key = {i}>
          <td style = {{color: color}}>{stocks[i].symbol}</td>
          <td style = {{color: color}}>{stocks[i].open}</td>
          <td style = {{color: color}}>{stocks[i].close}</td>
          <td style = {{color: color}}>{net.toFixed(2)}</td>
          <td style = {{color: color}}>{(stocks[i].latestPrice * stocks[i].shares).toFixed(2)}</td>
        </tr>)
    }
    return rows
  }
   
  render() {
    
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Ticker</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
            <th scope="col">Net</th>
            <th scrop="col">Total</th>
          </tr>
        </thead>
    <tbody>
    {console.log(this.props.userStocks.stocks)}
      {this.props.session.userId ?
      this.renderRows() : null}
    </tbody>
  
</table>
    )
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  userStocks: state.userStocks,
  session: state.session
})

const dispatch = {
  loadUserStockInfo
}

export default connect(mapStateToProps, dispatch)(DataTable);

