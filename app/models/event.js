const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
    firstName : {type : String , required : true},
    lastName : {type : String , required : true},
    mobile : {type : String , required : true}
})

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
    },
    tickets:{
        type: [TicketSchema],
        default : []
    }
    
} , {
    toJSON : {
        virtuals : true
    }
});
EventSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.coverImage}`
})
EventSchema.index({title:"text" , information : "text" , organizer :"text"})
module.exports = {
    EventModel : mongoose.model("event",EventSchema)
}