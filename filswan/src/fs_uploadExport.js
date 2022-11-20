import { mcsSDK } from 'js-mcs-sdk';
import dotenv from 'dotenv/config'
 
import { createReadStream } from 'fs'; // used to read files

const fsupload = async (filepath) => {

  try {

    console.log('fsupload...');
    console.log(filepath);

    var filename = filepath.replace(/^.*[\\\/]/, '');
    console.log(filename);

    const mcs = await mcsSDK.initialize({
      privateKey: process.env.PRIVATE_KEY,
      rpcUrl: process.env.RPC_URL
    });

    const fileArray = [{ fileName: filename, file: createReadStream(filepath) }]

    const uploadResponse = await mcs.upload(fileArray)
    console.log(uploadResponse)

    return (uploadResponse);

  } catch (e) {
    console.log(e)
  }
}
 
export default { fsupload };
