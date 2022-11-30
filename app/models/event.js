const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    image:{
        type: String, 
        required: true
    }
    
});
module.exports = {
    EventModel : mongoose.model("event",Schema)
}