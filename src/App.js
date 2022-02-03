import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Modal } from 'react-bootstrap';
import Keyboard from './Keyboard';
import Input from './Input';

function App() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  


  return (
    <div>
      <Container className="text-center">
        <Row>
          <Col lg={4} sm={0}></Col>
          <Col lg={4} sm={12}>
          <Container fluid>
            
            {/* TITLE */}
            <Row className="titleContainer">
              <Col>
                <div id="questionOuter" onClick={handleShow}>
                  <p id="question">?</p>
                </div>
              </Col>
              <Col>
                <h1 className="title">NUMBERLE</h1>
              </Col>
              <Col></Col>
              <hr></hr>
            </Row>

            {/* KEYBOARD */}
            <Row>
              <Keyboard></Keyboard>
            </Row>
          </Container>
          <div id="footer">
            <p>A Wordle parody by <a href="https://zachsallen.com" target={'_blank'}>Zach Allen</a></p>
          </div>
          </Col>
          <Col lg={4} sm={0}></Col>
        </Row>
      </Container>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className='border-0 text-center justify-content-center'>
          <Modal.Title className='modalTitle w-100'>HOW TO PLAY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Guess the <span id="numberle"><b>NUMBERLE</b></span> in 6 tries.
          <br></br>
          <br></br>
          Each guess must be a valid 5-number combination, not that you could guess otherwise or anything ¯\_(ツ)_/¯
          <br></br>
          <br></br>
          After each guess, the color of the tiles will change to show how close your guess was to the number.
          <hr></hr>
          <b>Examples</b><br></br><br></br>
          <Container>
            <Row>
              <Col lg={9}>
                <Container className="inputContainerModal">
                  <Row>
                      <Col className="inputColModal">
                          <div className="numInputModal text-center" style={{backgroundColor:'#6AAA64', color: '#FFFFFF', border: 'none'}}>2</div>
                      </Col>
                      <Col className="inputColModal">
                          <div className="numInputModal text-center">1</div>
                      </Col>
                      <Col className="inputColModal">
                          <div className="numInputModal text-center">7</div>
                      </Col>
                      <Col className="inputColModal">
                          <div className="numInputModal text-center">3</div>
                      </Col>
                      <Col className="inputColModal">
                          <div className="numInputModal text-center">5</div>
                      </Col>
                  </Row>
                </Container>
                <br></br><b>2</b> is in the number and is in the correct spot.<br></br><br></br>
                <Container className="inputContainerModal">
                      <Row>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">2</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">1</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center" style={{backgroundColor:'#C9B458', color: '#FFFFFF', border: 'none'}}>7</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">3</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">5</div>
                          </Col>
                      </Row>
                </Container>
                <br></br><b>7</b> is somewhere in the number but is not in the correct spot.<br></br><br></br>
                <Container className="inputContainerModal">
                      <Row>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">2</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center"style={{backgroundColor:'#787C7E', color: '#FFFFFF', border: 'none'}}>1</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">7</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">3</div>
                          </Col>
                          <Col className="inputColModal">
                              <div className="numInputModal text-center">5</div>
                          </Col>
                      </Row>
                </Container>
                <br></br><b>1</b> is not in the number at any spot.<br></br>
              </Col>
              <Col lg={3}>
              </Col>
            </Row>
          </Container>
           
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
