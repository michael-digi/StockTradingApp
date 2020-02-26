import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/Transaction.css';
import { loadUserStockInfo } from '../actions'
import { connect } from 'react-redux';

class Transactions extends React.Component {

renderRows = () => {
    let rows = []
    let { transactions }  = this.props.userStocks
    for (let i = 0; i < transactions.length; i++) {
      rows.push(
        <tr key = {i}>
          <td>{transactions[i][1]}</td>
          <td>{transactions[i][0]}</td>
          <td>{transactions[i][2]}</td>
          <td>{transactions[i][3]}</td>
          <td>{transactions[i][4]}</td>
        </tr>)
    }
    return rows
  }

  

  render() {
    return (
      <Container id = "transaction-container">
        <Row>
          <Col sm = {{ span: 12 }}>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Ticker</th>
                  <th scope="col">Type</th>
                  <th scope="col">Shares</th>
                  <th scope="col">Buy Price</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
              {console.log(this.props.userStocks.stocks)}
      {this.props.session.userId ?
      this.renderRows() : null}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
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

export default connect(mapStateToProps, dispatch)(Transactions)