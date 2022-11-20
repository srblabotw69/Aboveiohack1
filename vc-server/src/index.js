import express from 'express'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import multer from 'multer';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(bodyParser.json({ extended: true }));

app.use(cors());

app.use(morgan('combined'));

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});


import { insert, getByVC, callDID, callFilSwanWithParam, callNFTStorage } from '../users/controllers/controller.js';

app.post('/insert', [
	insert
]);

app.get('/vc/:did', [
	getByVC
]);

app.get('/createDID', [
	callDID
]);
 
const upload = multer({ dest: "uploads/" });

app.post('/callFilSwanWithParam', upload.single("file"), [
	callFilSwanWithParam
]); 

app.post('/callNFTStorage', upload.single("file"), [
	callNFTStorage
]);
