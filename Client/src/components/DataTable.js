import React from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './css/Table.css'

class DataTable extends React.Component {

  renderRows = () => {
    let rows = []
    let net;
    let { transactions }  = this.props.userStocks
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].open && transactions[i].close) {
        net = transactions[i].close - transactions[i].open
      }
      else {
        net = transactions[i].latestPrice - transactions[i].previousClose
      }
      rows.push(<tr key = {i}>
                  <td>{transactions[i].ticker}</td>
                  <td>{transactions[i].open}</td>
                  <td>{transactions[i].close}</td>
                  <td>{net.toFixed(2)}</td>
                  <td>-{transactions[i].total}</td>
                </tr>)
    }
    return rows;
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
    { this.props.userStocks.transactions ?
      this.renderRows() : null }
    }
    <tbody>

    </tbody>
  </thead>
  
</table>
    )
  }
}

const mapStateToProps = state => ({
  stock: state.stock,
  userStocks: state.userStocks
})

export default connect(mapStateToProps)(DataTable);

