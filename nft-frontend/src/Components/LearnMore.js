import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Alert, Modal } from "react-bootstrap";
 
const Example = () => {
 
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Click here to learn more!
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Aboveio</Modal.Title>
        </Modal.Header>
        <Modal.Body >  
          <Alert>
          <p>NFTs provides a way to prove ownership of (physical or digital) assets, but how can we
            improve their authenticity and legality? Suppose you buy an NFT linked to a real physical guitar,
            how can you easily verify that it was really from the stated manufacturer brand after the NFT have changed hands more than once?
            Or perhaps, you buy a NFT linked to a house then are you legally the owner of the house or just the NFT?   
          </p>
          <p>We can do so by:</p>
          <ol type="1">
            <li>making the NFT and it's assets verifiable</li>
            <li>provide a contract that will hold up in a court of law</li>
          </ol>
          <p>Aboveio provides NFT creators a 5 easy steps process to mint a verifiable and legally binding NFT on the Near Protocol:</p>
          <ol type="1">
            <li>Login to the app</li>
            <li>generate a DID (Decentralized Identifier) from the Near Protocol</li>
            <li>generate a Ricardian contract</li>
            <li>Mint an NFT with the option to embed the DID and Ricardian Contract</li>
            <li>Create and issue verifiable credentials for the NFT based on the DID</li>
          </ol>
        </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;