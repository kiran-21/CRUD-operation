const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const Userschema = new Schema({
    firstName: String,
    lastName: String,
    email:String,
}, { strict: true });

const user = mongoose.model('user',Userschema)
module.exports = user