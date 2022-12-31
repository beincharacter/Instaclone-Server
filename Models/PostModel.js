const mongoose = require('mongoose');
const User = require('./UserModel');

// const UserdetailSchema = new mongoose.Schema({
//     name: { type: String},
//     state: { type: String},
//     city: { type: String}
// })

const PostSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'instausers'},
    image: { type: String },
    description: { type: String },
    // user: [UserdetailSchema],
    user: {        
        name: { type: String},
        state: { type: String},
        city: { type: String}
    },
    date: { type: String },
    time: { type: String }
});

const Post = mongoose.model('instaposts', PostSchema);

module.exports = Post;