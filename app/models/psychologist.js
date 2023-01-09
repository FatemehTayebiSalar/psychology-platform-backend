const mongoose = require("mongoose");

const PsychologistSchema = new mongoose.Schema({
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
    },
    profileImage: {
        type: String,
        required: true
    }
    //visit-list
}, {
    toJSON : {
        virtuals : true
    }
});
PsychologistSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.profileImage}`
})
PsychologistSchema.index({name:"text" , degree : "text" , city :"text"})
module.exports = {
    PsychologistModel : mongoose.model("psychologist",PsychologistSchema)
}