import React from "react";
import PropTypes from "prop-types";
import { Alert, Card, Container, Button, Row } from "react-bootstrap";
import { login, logout } from "../utils";

const InfoBubble = (props) => {
  return (
    <Container>
      <Row
        className='d-flex justify-content-center'
        style={{ marginTop: "3vh" }}
      >
        <Card style={{ width: "100vw", padding: "3vw" }}>
          <Card.Title>Step 1:</Card.Title>
          <Card.Header><b>Login:</b><br></br>Login with Near Wallet</Card.Header>
          <Card style={{ padding: "3vw" }}>
            <Button
              onClick={window.walletConnection.isSignedIn() ? logout : login}
            >
              {window.walletConnection.isSignedIn() ? "Logout": "Login"}
            </Button>
            <p></p>
           <center> {window.walletConnection.isSignedIn() ? "Welcome " + window.accountId + "!": ""}</center>
          </Card>
        </Card>
      </Row>
    </Container>
  );
};

export default InfoBubble;
