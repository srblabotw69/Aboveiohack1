# web-ledger-context ChangeLog

## 12.0.0 - 2021-07-21

### Added
- **BREAKING**: Added `creator`, `primaryWitnessCandidate`, and
  `secondaryWitnessCandidate`

## 11.0.0 - 2021-07-21

### Changed
- Switch from using CURIEs to full URLs for @id.

### Removed
- Remove @version: 1.1.
- **BREAKING**: Removed `Config`, `Continuity2017Elector`,
  `Continuity2017GuarantorElector`, `Continuity2017Peer`,
  `DeleteWebLedgerRecord`, `Ed25519Signature2018`, `Ed25519VerificationKey2018`,
  `Elector`, `ElectorPool`, `EventTypeFilter`, `RecoveryElector`,
  `RevocationCheck`, `RsaSignature2018`, `RsaVerificationKey2018`,
  `SignatureValidator2017`, `SequentialList`, `UnilateralConsensus2017`,
  `allowedAction`, `approvedSigner`, `assertionMethod`, `authentication`,
  `canonicalizationAlgorithm`, `capability`, `capabilityAction`,
  `capabilityChain`, `capabilityDelegation`, `capabilityInvocation`,
  `capabilityStatusList`, `caveat`, `challenge`, `consensusMethod`,
  `consensusProofHash`, `controller`, `created`, `creator`, `defaultElector`,
  `delegator`, `digestAlgorithm`, `digestValue`, `domain`, `elector`,
  `electorSelectionMethod`, `electorPool`, `expirationDate`, `invocationTarget`,
  `invoker`, `jws`, `maximumElectorCount`, `minimumProofsRequired`,
  `minimumSignaturesRequired`, `nonce`, `owner`, `proof`, `proofAlgorithm`,
  `proofPurpose`, `proofValue`, `publicKey`, `publicKeyBase58`, `publicKeyPem`,
  `recommendedElector`, `requiredProof`, `revoked`, `targetNode`,
  `verificationMethod`, and more to clean up base web ledger context.

## 10.0.0 - 2021-03-09

### Added
- **BREAKING**: Add `peerCommitment`.

## 9.0.0 - 2021-02-15

### Added
- **BREAKING**: Add `parentHashCommitment`.

## 8.0.0 - 2020-12-11

### Added
- **BREAKING**: Add `witness` related terms and `mergeHeight`.

### Changed
- **BREAKING**: Make `blockHeight` and `basisBlockHeight` use
  `xsd:integer`.

## 7.0.0 - 2019-12-03

### Changed
- **BREAKING**: Make `record` and `recordPatch` use JSON literals.

## 6.0.0 - 2019-11-12

### Added
- **BREAKING**: Add new terms: `validatorParameterSet` and
  `ValidatorParameterSet`.

### Changed
- Move github repository to https://github.com/digitalbazaar/web-ledger-context
- Update dev dependencies.

## 5.0.0 - 2019-05-16

### Changed
- **BREAKING**: Implement a new module structure.
- Build and distribute static browser version with all contexts.
- Export a `contexts` Map associating context URIs to contexts.
- Export a `constants` Object associating short ids to contexts URIs.

## 4.0.0 - 2019-01-03

### Changed
- Update capability terms.

## 3.0.0 - 2018-12-21

### Changed
- Add `sequence`.

## 2.0.0 - 2018-12-18

### Changed
- Add `targetNode`.

## 1.0.0 - 2018-12-06

See git history for changes previous to this release.
