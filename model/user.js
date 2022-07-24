const {Schema, model} = require('mongoose')


const userSchema = Schema({
    firstname: String,
    lastname: String,
    phonenumber: String,
    city: String,
    state: String,
    country: String,
});



const User = model('User', userSchema);
module.exports = User;