import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";

// React Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

// React Bootstraps imports
import { Nav, Navbar, Container, Row, Col, Card, Alert } from "react-bootstrap";

// Custom Components
import MintingTool from "./Components/MintingTool";
import Login from "./Components/Login";

import getConfig from "./config";
// const { networkId } = getConfig(process.env.NODE_ENV || "development");

import VCTool from "./Components/VCTool";
import DIDTool from "./Components/DIDTool";
import Ricardian from "./Components/Ricardian";
import LearnMore from "./Components/LearnMore";

export default function App() {

  console.log('Running App...')
  console.log('AccountId: ' + `${window.accountId}`);

  const [userHasNFT, setuserHasNFT] = useState(false);

  return (
    <React.Fragment>
      {" "}
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>
            <label style={{ color: 'red' }}>Above</label>io
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav>
              <Nav.Link
                onClick={window.walletConnection.isSignedIn() ? logout : login}
              >
                {window.walletConnection.isSignedIn()
                  ? window.accountId
                  : "Login"}
              </Nav.Link>{" "}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container style={{ marginTop: "3vh" }}>
        {/* {" "} */}
        <Row>
          <Col sm={3} className='justify-content-right'>
                <Alert variant="success">
                <p></p>
                <center>
                  <p>Let's make your NFTs <br></br>verifiable and legally binding!</p>
                  <p> Mint the NFT in <br></br> 5 easy steps. </p>
                  <LearnMore />
                  <br></br>
                  <br></br>
                  <br></br>
                  Go your
                  <a href='https://wallet.testnet.near.org/' target="_blank"> wallet</a> <br></br>to see your
                  NFTs.
                  <br></br>
                  <p></p>
                </center>
              </Alert>
          </Col>
          <Col sm={7} className='justify-content-left'>
            <Container style={{ marginTop: "-3vh" }} className='justify-content-left'>
              <Row>
                <Login />
              </Row>
              <Row>
                <DIDTool />
              </Row>
              <Row>
              </Row>
              <Row>
                <Ricardian />
              </Row>
              <Row>
                <MintingTool userNFTStatus={userHasNFT} />
              </Row>
              <Row>
                <VCTool />
              </Row>
              <Row style={{ marginTop: "3vh" }}>
                <p>&nbsp;</p>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment >
  );
}
