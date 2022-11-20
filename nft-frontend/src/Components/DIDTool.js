import React from "react";
import { Form, Button, Card, Container, Row, Alert } from "react-bootstrap";

import { useState } from 'react';
import did from "../../../neardid/didExport.js"

const DIDTool = () => {

  const [message, setMessage] = useState('');
  const handleChange = event => {
    setMessage(event.target.value);
    console.log('value is:', event.target.value);
  };

  const callDID = async (userId) => {
    const newDID = await did.createDID()
    // .then((response) => response.json())
    // .then((data) => console.log(data));
    console.log(newDID);
    setMessage(newDID);
    console.log('createDID...');
    document.getElementById("mint_nft_dat1").value = newDID;

    anchorDID();
  };

  const anchorDID = async () => {
    console.log('anchorDID...');
    document.getElementById("mint_nft_dat2").value = 'Retrieving DID hash, please wait...';
    
    const inputVal = document.getElementById("didInput").value;
    const argJson = { "did": inputVal }
    const didHash = await window.contract.did_anchor(argJson);

    console.log('DID hash is:');
    console.log(didHash);
    
    document.getElementById("mint_nft_dat2").value = didHash;
   }

  return (

    <Container>
      <Row
        className='d-flex justify-content-center'
        style={{ marginTop: "3vh" }}
      >
        <Card style={{ width: "100vw", padding: "3vw" }}>
          <Card.Title>Step 2:</Card.Title>
          <Card.Header><b>Decentralized Identifier (DID):</b><br></br>Create a DID (Optional, but required for Verifiable Credentials)</Card.Header>
          <Card style={{ padding: "3vw" }}>
            <Button
              disabled={window.accountId === ""}
              onClick={
                () => callDID(message)}
            >
              Create a DID
            </Button>
            <br></br>
             DID
            <input type="text"
              id="didInput"
              name="didInput"
              onChange={handleChange}
              value={message}
              autoComplete="off"
               style={{ height: "2.5EM", "textalign": "center", backgroundColor: "lightcyan", "fontSize": "14px" }}
              disabled>
            </input>
          </Card>
        </Card>
      </Row>
    </Container>

  );
};

export default DIDTool;
