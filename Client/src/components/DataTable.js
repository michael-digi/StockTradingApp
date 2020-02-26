import React from 'react';
// import { loadUserStockInfo } from '../actions'
// import { connect } from 'react-redux';
import 'react-table-v6/react-table.css';
import './css/Table.css'
import axios from 'axios';

// this component is for displaying the DataTable next to the BuyStocks card. There is a
// rather large call in the componentDidMount function. It has to first query the user's stocks
// from the database, then get current information about those from the IEX API, and then submit
// them for the UI to render as specified

class DataTable extends React.Component {

  state = {
    loggedIn: Boolean(localStorage.getItem('userId')),
    data: '',
    portfolio: ''
  }
  componentDidMount() {
    this.loadTable()
  }
  
  loadTable = () => {
      let tickers, entries, data;
      let portfolio = 0
      axios.get('/api/user/userStocks', {
        params: {
          id: localStorage.getItem('userId')
        }
      })
       .then(res => {
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
          for (let i = 0; i < res.data.length; i++) {
             (res.data[i]['shares'] = data[res.data[i].symbol])
             portfolio += (res.data[i].latestPrice * res.data[i].shares)
           }
           console.log(res.data)
           this.setState({
             data: res.data,
             portfolio: portfolio.toFixed(2)
           })
      })})
   }

// his creates an array of rows that will be inserted into the (by default) empty table 
// inside the render function. It destructures the stock data. If there is an open/close 
// price, the table will it, but if not, it will be blank and only latest and last closing
// will be displayed. There is also a conditional rendering of the color based on if the 
// stock increased or decreased
  renderRows = () => {
    let rows = []
    let net, open, close;
    let color = 'gray'
    let stocks  = this.state.data
    for (let i = 0; i < stocks.length; i++) {
      stocks[i].open ? (open = stocks[i].open.toFixed(2)) : open = null;
      stocks[i].close ? (close = stocks[i].close.toFixed(2))  : close = null;
      
      (stocks[i].open && stocks[i].close) ?
      net = stocks[i].latestPrice - stocks[i].open :
      net = stocks[i].latestPrice - stocks[i].previousClose;
      
      (net > 0) ? color = 'lightgreen' : color = 'red'

      rows.push(
        <tr key = {i}>
          <td style = {{color: color}}>{stocks[i].symbol}</td>
          <td style = {{color: color}}>{open}</td>
          <td style = {{color: color}}>{close}</td>
          <td style = {{color: color}}>{stocks[i].latestPrice.toFixed(2)}</td>
          <td style = {{color: color}}>{stocks[i].previousClose.toFixed(2)}</td>
          <td style = {{color: color}}>{net.toFixed(2)}</td>
          <td style = {{color: color}}>{(stocks[i].latestPrice * stocks[i].shares).toFixed(2)}</td>
        </tr>)
    }
    return rows
  }
   
  render() {
    return (
      <div>
      <h2 style = {{color: 'white'}}> {`Portfolio Value: ${this.state.portfolio}`} </h2>
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
      {this.state.loggedIn ?
      this.renderRows() : null}
    </tbody>
</table>
<div style = {{color: 'white'}}>* Note: Open and Close values will not display until
 the market closes for the day.</div>
 </div>
    )
  }
}



export default (DataTable);

