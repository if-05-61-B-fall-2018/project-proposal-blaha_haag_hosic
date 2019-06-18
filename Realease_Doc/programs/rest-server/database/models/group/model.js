const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    members: [{
        type: String,
        required: true
    }],
});

module.exports = mongoose.model('Group', userSchema);