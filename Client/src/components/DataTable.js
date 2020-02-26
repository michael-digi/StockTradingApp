import React from 'react';
import { loadUserStockInfo } from '../actions'
import { connect } from 'react-redux';
import 'react-table-v6/react-table.css';
import './css/Table.css'

class DataTable extends React.Component {

  renderRows = () => {
    let rows = []
    let net, open, close;
    let color = 'gray'
    let { stocks }  = this.props.userStocks
    for (let i = 0; i < stocks.length; i++) {

      // stocks[i].open ? (open = stocks[i].open) : open = stocks[i].latestPrice;
      // stocks[i].close ? (close = stocks[i].close)  : close = stocks[i].previousClose;
      
      (stocks[i].open && stocks[i].close) ?
      net = stocks[i].close - stocks[i].open :
      net = stocks[i].latestPrice - stocks[i].previousClose;
      
      (net > 0) ? color = 'lightgreen' : color = 'red'

      rows.push(
        <tr key = {i}>
          <td style = {{color: color}}>{stocks[i].symbol}</td>
          <td style = {{color: color}}>{open}</td>
          <td style = {{color: color}}>{close}</td>
          <td style = {{color: color}}>{stocks[i].latestPrice}</td>
          <td style = {{color: color}}>{stocks[i].previousClose}</td>
          <td style = {{color: color}}>{net.toFixed(2)}</td>
          <td style = {{color: color}}>{(stocks[i].latestPrice * stocks[i].shares).toFixed(2)}</td>
        </tr>)
    }
    return rows
  }
   
  render() {
    return (
      <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Ticker</th>
            <th scope="col">Open</th>
            <th scope="col">Close</th>
            <th scope="col">Latest Price</th>
            <th scope="col">Previous Close</th>
            <th scope="col">Net</th>
            <th scrop="col">Total</th>
          </tr>
        </thead>
    <tbody>
      {this.props.session.userId ?
      this.renderRows() : null}
    </tbody>
</table>
<div style = {{color: 'white'}}>* Note: Open and Close values will not display until
 the market closes for the day.</div>
 </div>
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

