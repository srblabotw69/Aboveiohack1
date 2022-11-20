import { NFTStorage, File } from "nft.storage";
import fs from "fs";
 
const NFT_STORE_API_KEY = process.env.NFT_STORE_API_KEY;
 
const storeAsset = async (filepath) => {
    
    console.log('storeAsset...');
    console.log(filepath);
    console.log(process.env.NFT_STORE_API_KEY);

    const client = new NFTStorage({ token: NFT_STORE_API_KEY });

    var filename = filepath.replace(/^.*[\\\/]/, '');
    console.log(filename);

    const metaData = await client.store({
        name: "NFT Storage",
        description: "Store NFT on IPFS via NFTStorage",
        image: new File([await fs.promises.readFile(filepath)], filename, {
            type: "image/png",
        }),
    });

    console.log(metaData.url);
    return metaData.url;
};

export default {storeAsset};
