const Near = require('./ion-tools/node_modules/@decentralized-identity/ion-tools');

// const { exit } = require('process');
const fs = require('fs').promises
 
const createDID = async () => {
    // Create private/public key pair
    const authnKeys = await Near.generateKeyPair('secp256k1')
    console.log("Created private/public key pair")
    console.log("Public key:", authnKeys.publicJwk)
    console.log(process.env.KEY_DIR)
 
    // Create a DID
    const did = new Near.DID({
        content: {
            publicKeys: [
                {
                    id: 'auth-key',
                    type: 'EcdsaSecp256k1VerificationKey2019',
                    publicKeyJwk: authnKeys.publicJwk,
                    purposes: ['authentication']
                }
            ],
            services: [
                {
                    id: "myId",
                    type: "myType",
                    serviceEndpoint: {
                        "@context": "my.serviceEndPoint.identity/data",
                        "@type": "myServiceEndpoint",
                        instance: [
                            "did:demo:my.id",
                        ]
                    }
                }
            ],
        }
    })
    const didUri = await did.getURI('short')
    console.log("Generated DID:", didUri)

    return didUri;
}

const signWithDID = async (ipfs_path) => {
    
    // Sign data with DID
    const privateKey = JSON.parse(await fs.readFile('privateKey.json'))
    //const myData = 'This message is signed and cannot be tempered with'
    const myData = readFromURL(ipfs_path);
    const signature = await ION.signJws({
        payload: myData,
        privateJwk: privateKey
    });
    console.log("Signed JWS:", signature)

    const randomKeyPair = await ION.generateKeyPair('secp256k1')
    let verifiedJws = await ION.verifyJws({
        jws: signature,
        publicJwk: randomKeyPair.publicJwk
    })
    console.log("Verify with random new key:", verifiedJws)

    const publicKey = JSON.parse(await fs.readFile('publicKey.json'))
    verifiedJws = await ION.verifyJws({
        jws: signature,
        publicJwk: publicKey
    })
    console.log("Verify with my public key:", verifiedJws)
}

const readFromURL = async (ipfs_path) => {
    
    var http = require('https');

    var options = {
        host: 'calibration-ipfs.filswan.com',
        path: ipfs_path
    }

    var request = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            console.log(data);

        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();
 
}


module.exports = { createDID, signWithDID, readFromURL };