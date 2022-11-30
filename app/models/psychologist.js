const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    visitAmount: {
        type: Number,
        required: true
    }
    //visit-list
});
module.exports = {
    PsychologistModel : mongoose.model("psychologist",Schema)
}