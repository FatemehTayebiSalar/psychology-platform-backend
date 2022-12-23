const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
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
    coverImage:{
        type: String, 
        required: true
    }
    
});
EventSchema.index({title:"text" , information : "text" , organizer :"text"})
module.exports = {
    EventModel : mongoose.model("event",EventSchema)
}