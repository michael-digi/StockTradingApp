import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import './css/Table.css'

class DataTable extends React.Component {

  render() {
    
    return (
      <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Ticker</th>
      <th scope="col">Open</th>
      <th scope="col">Close</th>
      <th scope="col">Net</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">AAPL</th>
      <td>324.32</td>
      <td>234.3</td>
      <td>-100</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
    )
  }
}

export default DataTable;