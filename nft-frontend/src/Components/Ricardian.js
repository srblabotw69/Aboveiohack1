import React, { useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Dropdown, DropdownButton  } from "react-bootstrap";

// import Upload from "./Upload";

const RicardianTool = () => {
//////////// NFTStorage

const saveToNFTStorage = async () => {
  console.log("saveToNFTStorage...");

  try {

    document.getElementById("fileURLInput").value = 'saving to IPFS via NFTStorage, please wait...';
    const formData = new FormData();

    formData.append('file', selectedFile);

    console.log(selectedFile);

    const requestOptions = {
      method: 'POST',
      body: formData
    }
    // fetch('http://localhost:3001/callNFTStorage', requestOptions)
    let url = process.env.SITE_URL + ':3001/callNFTStorage';
    console.log(url);
    await fetch(url, requestOptions)

      .then(response => response.json()
        .then(obj => setMessage(obj.ipfs_url)))
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.log(error);
  }
}

//////////// FileSwan

const [filswanURLVal, changeFilswanLinkURLVal] = useState("");

const handleSubmission = async () => {
  try {
    console.log("handleSubmission...");
    document.getElementById("fileURLInput").value = 'saving to IPFS via FilSwan, please wait...';
    const formData = new FormData();

    formData.append('file', selectedFile);

    console.log(selectedFile);
    console.log(formData.getAll('file'));

    // fetch('http://localhost:3001/callFilSwanWithParam',
    let url = process.env.SITE_URL + ':3001/callFilSwanWithParam';
    await fetch(url,   
      {
        method: 'POST',
        body: formData
      })
      .then(response => response.json()
        .then(obj2 => setMessage(obj2.ipfs_url)))
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.log(error);
  }
};

const [selectedFile, setSelectedFile] = useState();
const [isSelected, setIsSelected] = useState(false);

const changeHandler = (event) => {
  console.log('changeHandler...');
  console.log(event.target.files[0]);
  setSelectedFile(event.target.files[0]);
  setIsSelected(true);
};

const [message, setMessage] = useState('');
const handleChange = event => {
  setMessage(event.target.value);
  console.log('value is:', event.target.value);
};

const [value, setValue] = useState('');
const handleSelect = (e) => {
  console.log('handleSelect...');
  console.log(e);
  setValue(e);
  setMessage('');
  
  //document.getElementById("ricardianHashInput").value = '';
  setMessageR('');

};

const uploadFile = async (event) => {
  console.log("uploadFile...");
  event.preventDefault();

  if (value == 'Filswan') {
    handleSubmission();
  } else if (value == 'NFTStorage') {
    saveToNFTStorage(event);
  }
};

////////////////////////////////////////////////////////////

  const [messageR, setMessageR] = useState('');

  const handleChangeR = event => {
    setMessageR(event.target.value);
    console.log('value is:', event.target.value);
  };

  const anchorRicardian = async () => {
    console.log('Anchoring Ricardian to Near...');
    document.getElementById("ricardianHashInput").value = "Anchoring Ricardian contract to Near, please wait...";
    const inputVal = document.getElementById("fileURLInput").value;
   
    const argJson = { "ricardian_url": inputVal }
    console.log(argJson);
    const ricardianHash = await window.contract.ricardian_anchor(argJson);

    console.log('Ricardian contract hash is:');
    console.log(ricardianHash);
    setMessageR(ricardianHash);

    document.getElementById("mint_nft_dat3").value = inputVal;
    document.getElementById("mint_nft_dat4").value = ricardianHash;
  }

  return (
    <Container>
      <Row
        className='d-flex justify-content-center'
        style={{ marginTop: "3vh" }}
      >
        <Card style={{ width: "100vw", padding: "3vw" }}>
          <Card.Title>Step 3:</Card.Title>
          <Card.Header><b>Ricardian Contract:</b><br></br>Choose a storage provider, upload a file document, and then create a Ricardian Contract (Optional)</Card.Header>
          {/* <Upload /> */}
          <React.Fragment>
      <Container>
        <Row className='d-flex justify-content-center'>
          <Card style={{ padding: "3vw" }}>
            <Form.Group controlId='formFile' className='mb-3'>
              Storage Provider
              <DropdownButton
                variant="success"
                title={value || 'Choose a storage provider '}
                key={value}
                id={`dropdown-${value}`}
                onSelect={handleSelect}>
                <Dropdown.Menu >
                  <Dropdown.Item eventKey="Filswan">Filswan (IPFS & Filecoin)</Dropdown.Item>
                  <Dropdown.Item eventKey="NFTStorage">NFTStorage (IPFS & Filecoin)</Dropdown.Item>
                </Dropdown.Menu>
              </DropdownButton>
              <p></p>
              <Form.Control onChange={changeHandler} type='file' />
            </Form.Group>
            <Button disabled={window.accountId === ""}
              onClick={uploadFile}>Upload
            </Button>
            <br></br>
            File URL
            <input type="text"
              id="fileURLInput"
              name="fileURLInput"
              value={message}
              onChange={handleChange}
              autoComplete="off"
              style={{ height: "2.5EM", backgroundColor: "lightcyan", "fontSize": "14px" }}
              disabled>
            </input>
          </Card>
        </Row>
      </Container>
    </React.Fragment>

          <Container>
            <Row className='d-flex justify-content-center'>
              <Card style={{ padding: "3vw" }}>
                <Button
                  disabled={window.accountId === "" || message ===""}
                  onClick={anchorRicardian}
                >
                  Create a Ricardian Contract
                </Button>
                <p></p>
                Ricardian Contract File Hash
                <input type="text"
                  id="ricardianHashInput"
                  name="ricardianHashInput"
                  onChange={handleChangeR}
                  value={messageR}
                  autoComplete="off"
                  style={{ height: "2.5EM", backgroundColor: "lightcyan", "fontSize": "14px" }}
                  disabled>
                </input>
              </Card>
            </Row>
          </Container>

        </Card>
      </Row>
    </Container>
  );
}

export default RicardianTool;
