import React from 'react';
import BuyStocks from './BuyStocks';
import DataTable from './DataTable';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// the portfolio page which displays the user's stocks with their worth in DataTable, and
// shows the card that contains the ticker/shares inputs to buy stocks

function Portfolio() {
  return (
      <div style = {{height: '100%'}}>
      <Container id = "ticker-container">
        <Row>
          <Col sm = {{ span: 8 }}>
            <DataTable />
          </Col>
          <Col sm = {{ span: 3, offset: 1}}>
           <BuyStocks />
          </Col>
        </Row>
      </Container>
      </div>
    )
  }



export default (Portfolio);