const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    image: { type: String },
    description: { type: String },
    name: { type: String },
    state: { type: String },
    city: { type: String },
    date: { type: String },
    time: { type: String }
});

const Post = mongoose.model('instaposts', PostSchema);

module.exports = Post;