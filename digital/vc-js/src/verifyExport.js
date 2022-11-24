import {issue} from '@digitalbazaar/vc';

import {Ed25519VerificationKey2018} from
  '@digitalbazaar/ed25519-verification-key-2018';
import {Ed25519Signature2018} from '@digitalbazaar/ed25519-signature-2018';
// import { exit } from 'process';

const getSignedVC = async did => {

  console.log('running getSignedVC()...');

  const keyPair = await Ed25519VerificationKey2018.generate();
  keyPair.id = 'https://example.edu/issuers/keys/1'; // See Key ID section
  // eslint-disable-next-line max-len
  keyPair.controller = 'https://example.com/i/carol'; // See Controller Document section

  const suite = new Ed25519Signature2018({
    verificationMethod: keyPair.id,
    key: keyPair
  });

  // Sample unsigned credential
  const credential = {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://www.w3.org/2018/credentials/examples/v1'
    ],
    id: 'https://example.com/credentials/1872',
    type: ['VerifiableCredential', 'AlumniCredential'],
    issuer: 'https://example.edu/issuers/565049',
    issuanceDate: '2015-01-01T19:23:24Z',
    credentialSubject: {
      id: did,
      alumniOf: 'Example Alumni'
    }
  };

  const signedVC = await issue({credential, suite});
  console.log(JSON.stringify(signedVC, null, 2));

  return JSON.stringify(signedVC, null, 2);
};

export default {getSignedVC};
