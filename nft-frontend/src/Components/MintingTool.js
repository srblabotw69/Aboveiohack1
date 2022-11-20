import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Row} from "react-bootstrap";
const BN = require("bn.js");

import { useState } from 'react';

const MintingTool = (props) => {

  const mintNFT = async () => {
    const did_str = document.getElementById("mint_nft_dat1").value;
    const did_hsh = document.getElementById("mint_nft_dat2").value;
    const ricardian_url = document.getElementById("mint_nft_dat3").value;
    const richardian_hsh = document.getElementById("mint_nft_dat4").value;

    console.log(did_str);
    console.log(did_hsh);
    console.log(ricardian_url);
    console.log(richardian_hsh);

    let metaParam = {
      token_id: token_id_Input.value,
      metadata: {
        title: title_Input.value,
        description: description_Input.value,
        media: media_Input.value,
        did_string: did_str,
        did_hash: did_hsh,
        ricardian_url: ricardian_url,
        ricardian_hash: richardian_hsh,
      },
      receiver_id: window.accountId,
    }
    console.log(metaParam);

    if (await check_token(token_id_Input.value)) {
      alert('token exists, please change token id.');
    } else {
      await window.contract.nft_mint(metaParam,
        300000000000000, // attached GAS (optional)
        new BN("1000000000000000000000000")
      );
    }

  };

  const [messageA, setMessageA] = useState('');
  const handleChangeA = event => {
    setMessageA(event.target.value);
    console.log('value is:', event.target.value);
  };

  const [messageB, setMessageB] = useState('');
  const handleChangeB = event => {
    setMessageB(event.target.value);
    console.log('value is:', event.target.value);
  };

  const [messageC, setMessageC] = useState('');
  const handleChangeC = event => {
    setMessageC(event.target.value);
    console.log('value is:', event.target.value);
  };

  const [messageD, setMessageD] = useState('');
  const handleChangeD = event => {
    setMessageD(event.target.value);
    console.log('value is:', event.target.value);
  };

  const check_token = async (tokenId) => {
    console.log('check_token...');

    const token_id_str = tokenId;
    let nft_name_array = await nft_tokens_for_owner();

    console.log(token_id_str);
    console.log(nft_name_array);
    console.log(nft_name_array.indexOf(token_id_str));

    if (nft_name_array.indexOf(token_id_str) !== -1) {
      console.log("Yes, the value exists!");
      return true;
    } else {
      console.log("No, the value is absent.");
      return false;
    }
  }

  const nft_tokens_for_owner = async () => {
    let nft_token_array = await window.contract.nft_tokens_for_owner({
      account_id: `${window.accountId}`
    });

    var arrayLength = nft_token_array.length;
    const nft_name_array = [];
    for (var i = 0; i < arrayLength; i++) {
      console.log(nft_token_array[i].token_id);

      nft_name_array[i] = nft_token_array[i].token_id;
    }
    return nft_name_array;
  };

  return (

    <Container>
      <Row
        className='d-flex justify-content-center'
        style={{ marginTop: "3vh" }}
      >
        <Card style={{ width: "100vw", padding: "3vw" }}>
          <Card.Title>Step 4:</Card.Title>
          <Card.Header><b>Mint NFT:</b><br></br>Mint a NFT and then go your{" "}
            <a href='https://wallet.testnet.near.org/' target="_blank"> wallet</a> and see your
            NFT</Card.Header>
          <Card style={{ padding: "3vw" }}>
            Token Id  <label className="fst-italic fw-lighter" style={{ "fontSize": "14px" }}>
              (e.g. accountId.testnet-gibson-guitar-token6)</label>
            <input type="text" id="token_id_Input"
              name="token_id_Input"
              onChange={handleChangeA}
              value={messageA || `${window.accountId}-gibson-guitar-token6`}
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", "color": "black", "fontSize": "14px" }}>
            </input>
            <p></p>
            Title <label className="fst-italic fw-lighter" style={{ "fontSize": "14px" }}>
              (e.g. Gibson Guitar)</label>
            <input type="text"
              id="title_Input"
              name="title_Input"
              onChange={handleChangeB}
              value={messageB || "Gibson Guitar"}
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", "color": "black", "fontSize": "14px" }}>
            </input>
            <p></p>
            Description <label className="fst-italic fw-lighter" style={{ "fontSize": "14px" }}>
              (e.g. This is a 1957 genuine Gibson guitar.)</label>
            <input type="text"
              id="description_Input"
              name="description_Input"
              onChange={handleChangeC}
              value={messageC || "This is a 1957 genuine Gibson guitar."}
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", "color": "black", "fontSize": "14px" }}>
            </input>
            <p></p>
            Media <label className="fst-italic fw-lighter" style={{ "fontSize": "14px" }}>
              (e.g. https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif)</label>
            <input type="text"
              id="media_Input"
              name="media_Input"
              onChange={handleChangeD}
              value={messageD || "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", "color": "black", "fontSize": "14px" }}>
            </input>
            <p></p>
            DID (from step 2)
            <input type="text"
              id="mint_nft_dat1"
              name="mint_nft_dat1"
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", backgroundColor: "lightcyan", "fontSize": "14px" }}
              disabled>
            </input>
            <p></p>
            DID Hash (from step 2)
            <input type="text"
              id="mint_nft_dat2"
              name="mint_nft_dat2"
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", backgroundColor: "lightcyan", "fontSize": "14px" }}
              disabled>
            </input>
            <p></p>
            Ricardian Contract File URL (from step 3)
            <input type="text"
              id="mint_nft_dat3"
              name="mint_nft_dat3"
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", backgroundColor: "lightcyan", "fontSize": "14px" }}
              disabled>
            </input>
            <p></p>
            Ricardian Contract File URL Hash (from step 3)
            <input type="text"
              id="mint_nft_dat4"
              name="mint_nft_dat4"
              autoComplete="off"
              style={{ height: "2.5EM", "textalign": "center", backgroundColor: "lightcyan", "fontSize": "14px" }}
              disabled>
            </input>
            <p></p>
            <p></p>
            <Button
              disabled={window.accountId === ""}
              onClick={mintNFT}
            >
              Mint NFT
            </Button>
          </Card>
        </Card>
      </Row>
    </Container>
  );
};

MintingTool.propTypes = {};

export default MintingTool;
