import crypto from 'crypto';
import mongoose from 'mongoose';

import model from "../models/model.js";
import ver from '../../../digital/vc-js/src/verifyExport.js';

import did from "../../../neardid/didExport.js"
import filswanUpload from "../../../filswan/src/fs_uploadExport.js";
import nftStorage from "../../../nftStorage/src/indexExport.js";
import fs from 'fs';

const createUser = (userData) => {
	try {
		console.log('running createUser...');
		console.log(userData);
		const user = new model.User(userData);
		return user.updateOne({ upsert: true });
	} catch (error) {
		console.log(error);
	}
};

const insert = async (req, res) => {

	// db connection
	await mongoose.connect('mongodb://localhost:27017/test');
  
	console.log(mongoose.connection.readyState);  // 1 is connected.

	let salt = crypto.randomBytes(16).toString('base64');  //toString('base64') or toString('hex')

	let hash = crypto.createHmac('sha512', salt).update(salt).digest("base64");
	req.body.password = salt + "$" + hash;
	req.body.permissionLevel = 1;

	createUser(req.body).then((result) => {
		console.log(result);
		res.status(201).send({ id: result._id });
	});
};

const getById = (req, res) => {
	console.log('running getById...');
	console.log(req.params.userId);
	model.User.findById(req.params.userId).then((result) => {
		res.status(200).send(result);
	});
};

const findById = async (id) => {
	const result = await model.User.findById(id);
	result = result.toJSON();
	delete result._id;
	delete result.__v;
	return result;
};

const getByDID = (req, res) => {
	console.log('running getByDID...');
	console.log(req.params.did);
	model.User.find({ DID: req.params.did }).then((result) => {
		res.status(200).send(result);
	});
};

const getByVC = async (req, res) => {
	console.log('running getByVC...');
	console.log(req.params.did);

	if (req.params.did !== '' || req.params.did !== null) {
		let result = await ver.getSignedVC(req.params.did);
		model.User.find({ DID: req.params.did }).then(() => {
			res.status(200).send(result);
		});
	}
};

const callDID = async (req, res) => {
	const newDID = await did.createDID();
	console.log(newDID);
	console.log('createDID...');
	res.status(200).send(newDID);
};

const callFilSwanWithParam = async (req, res) => {

	try {
		console.log('callFilSwanWithParam...');

		console.log(req.file);
		console.log(req.file.name);

		let fileParam = req.file;
		let filename = fileParam.filename;
		let filename_org = fileParam.originalname;

		let filedir = process.env.UPLOAD_DIR;

		fs.rename(filedir + filename, filedir + filename_org, function (err) {
			if (err) throw err;
			console.log('File Renamed.');
		});

		let filepath = filedir + filename_org;

		const filswan_resp = await filswanUpload.fsupload(filepath)

		console.log(filswan_resp);
		console.log("ipfs_url:");
		console.log(filswan_resp[0].data.ipfs_url);

		res.status(200).send({ "ipfs_url": filswan_resp[0].data.ipfs_url });
	} catch (error) {
		console.log(error);
	}
};

const callNFTStorage = async (req, res) => {
	console.log('callNFTStorage...');
	console.log(req.file);

	let fileParam = req.file;
	let filename = fileParam.filename;
	let filename_org = fileParam.originalname;

	let filedir = process.env.UPLOAD_DIR;

	fs.rename(filedir + filename, filedir + filename_org, function (err) {
		if (err) throw err;
		console.log('File Renamed.');
	});

	let filepath = filedir + filename_org;

	const nftStorage_resp = await nftStorage.storeAsset(filepath);

	console.log(nftStorage_resp);
	console.log("ipfs_url:");
	console.log(nftStorage_resp);

	res.status(200).send({ "ipfs_url": nftStorage_resp });
	console.log(nftStorage_resp);
};

export { insert, getById, getByDID, getByVC, callDID, callFilSwanWithParam, callNFTStorage };
