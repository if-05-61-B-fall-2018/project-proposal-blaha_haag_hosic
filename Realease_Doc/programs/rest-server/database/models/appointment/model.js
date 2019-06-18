const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number, 
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);