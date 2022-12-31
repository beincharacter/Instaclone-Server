const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, reuired: true},
    email: {type: String, reuired: true, unique: true},
    password: {type: String, required: true},
    phone: {type: Number, reuired: true},
    state: {type: String},
    city: {type: String}
});

const User = mongoose.model('instausers', UserSchema);

module.exports = User;