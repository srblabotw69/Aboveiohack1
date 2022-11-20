import React, { useState } from "react"; 
import { Form, Button, Card, Container, Dropdown, DropdownButton, Row, Col } from "react-bootstrap";

const VCTool = () => {

  const [message, setMessage] = useState('');

  const [message2, setMessage2] = useState('');

  const [messageIdUrl1, setmessageIdUrl1] = useState('');
  const [messageDID, setMessageDID] = useState('');
  const [messageCreated, setMessageCreated] = useState('');
  const [messageIssuanceDate, setMessageIssuanceDate] = useState('');
  const [messageIssuer, setMessageIssuer] = useState('');

  const [messageIssueVC, setMessageIssueVC] = useState('');

  const [messageNftTokenId, setMessageNftTokenId] = useState('');

  const [messageTitle, setMessageTitle] = useState('');
  const [messageDescription, setMessageDescription] = useState('');
  const [messageMedia, setMessageMedia] = useState('');

  const [myArray, updateMyArray] = useState([]);

  const handleChange = event => {
    setMessage(event.target.value);
    console.log('value is:', event.target.value);
  };

  const createVC = async (userId) => {
    console.log('createVC...');
    const inputVal = document.getElementById("didFromNFTIdInput").value;
    console.log(inputVal);
    console.log('Creating Vertifiable Credentials: ');
    console.log(messageNftTokenId);

    let nft_token_array = await window.contract.nft_tokens_for_owner({
      account_id: `${window.accountId}`
    });
    console.log(nft_token_array);

    let title_val = '';
    let description_val = '';
    let media_val = '';

    var arrayLength = nft_token_array.length;
    for (var i = 0; i < arrayLength; i++) {
      if (nft_token_array[i].token_id == messageNftTokenId) {
        if (nft_token_array[i].metadata.did_string !== null && nft_token_array[i].metadata.did_string !== '') {
          // console.log(nft_token_array[i].token_id + ' --> ' + nft_token_array[i].metadata.title);
          // console.log(nft_token_array[i].token_id + ' --> ' + nft_token_array[i].metadata.description);
          // console.log(nft_token_array[i].token_id + ' --> ' + nft_token_array[i].metadata.media);
          title_val = nft_token_array[i].metadata.title;
          description_val = nft_token_array[i].metadata.description;
          media_val = nft_token_array[i].metadata.media;
          console.log(title_val);
          console.log(description_val);
          console.log(media_val);

          console.log('////////////////////////////////////');
          console.log(nft_token_array[i].metadata.title);
          console.log(nft_token_array[i].metadata.description);
          console.log(nft_token_array[i].metadata.media);



          // setMessageTitle(nft_token_array[i].metadata.title);
          // setMessageDescription(nft_token_array[i].metadata.description);
          // setMessageMedia(nft_token_array[i].metadata.media);
          setMessageTitle(title_val);
          setMessageDescription(description_val);
          setMessageMedia(media_val);

          console.log(messageTitle);
          console.log(messageDescription);
          console.log(messageMedia);
        }
      }
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "nftTokenID": messageNftTokenId,
          "title": title_val,
          "description": description_val,
          "media": media_val,
          "DID": inputVal
        }
      )
    };
    
    // await fetch('http://localhost:3001/insert', requestOptions)
   let url = process.env.SITE_URL + ':3001/insert';  
   console.log(process.env.SITE_URL);
   await fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data));
  };

  const handleChange2 = event => {
    setMessage2(event.target.value);
    console.log('value is:', event.target.value);
  };

  const getVC = async (userId) => {
    console.log('getVC...');

    const inputVal = document.getElementById("didFromNFTIdInput").value;
    console.log(inputVal);

    if (inputVal == 'No DID found for this NFT Token Id.') {
      return;
    }

    console.log('Getting Vertifiable Credentials: ');
    console.log(inputVal);

    try {
      await createVC(userId);

      if (inputVal !== "") {
        // await fetch('http://localhost:3001/vc/' + inputVal)
        //  let url = 'http://' + process.env.DOMAIN + ':3001/vc/' + inputVal;
        //  await fetch(url)

        // console.log(process.env.DOMAIN);
        // console.log('http://' + process.env.DOMAIN + ':3001/vc/' + inputVal);
        let url = process.env.SITE_URL + ':3001/vc/' + inputVal;
        console.log(url);

        // let url = 'http://localhost:3001/vc/' + inputVal;
        await fetch(url)

        
          .then((response) => response.json())
          .then((data) => {

            console.log(data);

            let objJson = JSON.stringify(data);
            let obj = JSON.parse(objJson);
            setmessageIdUrl1(obj.id);
            setMessageDID(obj.credentialSubject.id);
            setMessageCreated(obj.proof.created);
            setMessageIssuanceDate(obj.issuanceDate);
            setMessageIssuer(obj.issuer);
          });

      } else {
        setMessageIssueVC('No DID selected.  Please choose a NFT Token Id.');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [value, setValue] = useState('');
  const handleSelect = (e) => {
    console.log('handleSelect...');
    console.log(e);
    setValue(e);
    document.getElementById("didFromNFTIdInput").value = viewDIDFromNFT(e);
    setMessageNftTokenId(e);
    console.log(messageNftTokenId);

    setmessageIdUrl1('');
    setMessageDID('');
    setMessageCreated('');
    setMessageIssuanceDate('');
    setMessageIssuer('');
    setMessageTitle('');
    setMessageDescription('');
    setMessageMedia('');
  };

  const viewDIDFromNFT = async (tokenId) => {
    console.log('viewDIDFromNFT...');
    console.log(tokenId);

    setMessageIssueVC('');

    let nft_token_array = await window.contract.nft_tokens_for_owner({
      account_id: `${window.accountId}`
    });
    console.log(nft_token_array);

    setMessage("Retrieving DID, please wait...");
    let isExists = false;

    var arrayLength = nft_token_array.length;
    for (var i = 0; i < arrayLength; i++) {
      console.log(nft_token_array[i].token_id + "    " + tokenId);
      if (nft_token_array[i].token_id == tokenId) {
        console.log(nft_token_array[i].metadata.did_string);
        setMessage(nft_token_array[i].metadata.did_string);
        isExists = true;
        return nft_token_array[i].metadata.did_string;
      }
    }

    console.log('retrieving token list...');

    if (isExists == false) {
      setMessage("No DID found for this NFT Token Id.");
    }
  };

  const getDIDFromNFT = async () => {
    console.log('getDIDFromNFT...');

    setMessageIssueVC('');
    updateMyArray([]);

    let nft_token_array = await window.contract.nft_tokens_for_owner({
      account_id: `${window.accountId}`
    });

    console.log(nft_token_array);

    setMessage("Retrieving NFT token Ids that have DID, please wait...");
    let isExists = false;

    var arrayLength = nft_token_array.length;
    console.log(myArray);

    for (var i = 0; i < arrayLength; i++) {
      if (nft_token_array[i].metadata.did_string !== null && nft_token_array[i].metadata.did_string !== '') {
        updateMyArray(myArray => [...myArray, nft_token_array[i].token_id]);
        console.log(nft_token_array[i].token_id + ' --> ' + nft_token_array[i].metadata.did_string);
      }
    }
    handleSelect();

    console.log(myArray);

    if (isExists == false) {
      setMessage("No DID found for this NFT Token Id.");
    }
  };

  return (

    <Container>
      <Row
        className='d-flex justify-content-center'
        style={{ marginTop: "3vh" }}
      >
        <Card style={{ width: "100vw", padding: "3vw" }}>
          <Card.Title>Step 5:</Card.Title>
          <Card.Header> <b>Verfiable Credentials (VC):</b><br></br>Retrieve NFTs with DID from wallet first. Then choose a NFT and issue Verifiable Credentials </Card.Header>
          <Card style={{ padding: "3vw" }}>
            <Container>
              <Row className='d-flex justify-content-left'>
                <Button
                  disabled={window.accountId === ""}
                  onClick={getDIDFromNFT}
                  // style={{ width: "50vw" }}
                >
                  Retrieve NFTs with DID from wallet
                </Button>
                <p></p>
              </Row>
            </Container>
            NFT Token Id
            <DropdownButton
              disabled={window.accountId === "" || value === ""}
              title={value || 'Choose a NFT Token Id with a DID'}
              id='nftTokenDropdown'
              onSelect={handleSelect}
              variant="success"
            >  {myArray.map(
              (val) => (<Dropdown.Item eventKey={val} key={val} >{val}</Dropdown.Item>))}
            </DropdownButton>
            <Container>
              <Row className='d-flex justify-content-left'>
                DID<br></br>
                <input type="text"
                  id="didFromNFTIdInput"
                  name="didFromNFTIdInput"
                  onChange={handleChange}
                  value={message}
                  autoComplete="off"
                  style={{ height: "2.5EM", backgroundColor: "lightcyan", "fontSize": "14px" }}
                  disabled>
                </input>
                <p></p>
                <p></p>
              </Row>
              <p></p>
              <Row className='d-flex justify-content-left'>
                <Button
                  disabled={window.accountId === ""}
                  onChange={handleChange2}
                  onClick={
                    () => getVC(message2)}
                  style={{ width: "50vw" }}
                >
                  Issue Verifiable Credentials
                </Button>
                {messageIssueVC}
              </Row>
              <Row className='d-flex justify-content-left'>
                <p>{message2}</p>
                {/* Vertifiable Credentials   */}
                {/* <Card style={{ width: '100%' }}> */}
                <Card style={{ width: "100vw", padding: "2vw" }}>
                  <Card.Body>
                    <Card.Title>Credentials</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{messageTitle}</Card.Subtitle>
                    <Container>
                      <Row>
                        <Col style={{ fontSize: "15px" }}><b>DID</b></Col>
                      </Row>
                      <Row>
                        <Col style={{ fontSize: "15px" }}> </Col>
                      </Row>
                      <Row>
                        <Col style={{ fontSize: "14px" }}>{messageDID}</Col>
                      </Row>
                      <Row><Col>&nbsp;</Col>
                      </Row>
                      <Row>
                        <Col style={{ fontSize: "15px" }} xs={4}>Created</Col>
                        <Col style={{ fontSize: "13px" }}>{messageCreated}  </Col>
                      </Row>
                      <Row>
                        <Col style={{ fontSize: "15px" }} xs={4}>Issuance Date</Col>
                        <Col style={{ fontSize: "13px" }}>{messageIssuanceDate}</Col>
                      </Row>
                      <Row>
                        <Col style={{ fontSize: "15px" }} xs={4}>Issuer</Col>
                        <Col style={{ fontSize: "13px" }}>{messageIssuer}</Col>
                      </Row>
                      <Row>
                        <Col style={{ fontSize: "15px" }} xs={4}>Description</Col>
                        <Col style={{ fontSize: "13px" }}>{messageDescription}</Col>
                      </Row>
                      <Row><p></p></Row>
                    </Container>
                    <Card.Link style={{ fontSize: "14px" }} href={messageMedia}>Media</Card.Link>
                  </Card.Body>
                </Card>
                <p></p>
              </Row>
            </Container>
          </Card>
        </Card>
      </Row>
    </Container>
  );
};

export default VCTool;
