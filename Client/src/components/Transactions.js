import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './css/Transaction.css';

class Transactions extends React.Component {
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
            </table>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Transactions;