import mongoose from 'mongoose';      

const userSchema = new mongoose.Schema({
   nftTokenID: String,
   title: String,
   description: String,
   media: String,
   DID:  { type: String, require: true, unique: true }

});

const User = mongoose.model('User', userSchema);

export default {User}; 