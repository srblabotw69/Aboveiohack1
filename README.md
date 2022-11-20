//////////////////////////////////////////
INSTALL
//////////////////////////////////////////

git clone https://github.com/srblabotw69/Aboveio20221120
 
cd Aboveio20221120
yarn --cwd nft-frontend install
yarn --cwd vc-server install
yarn --cwd filswan install
yarn --cwd nftStorage install


Change keys and dir paths in these files:
vs-server/.env 
nft-frontend/.env

//////////////////////////////////////////
RUN
//////////////////////////////////////////
 
cd nft-frontend 
yarn start 

// start another window
cd vc-server
node src


//////////////////////////////////////////
NOTES
//////////////////////////////////////////

This project adapts and/or uses the following projects:
near protocol
filswan
nftstorage
digitalbazzar
ion
