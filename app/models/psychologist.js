const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    status :{
        type : String,
        default : "pending"
    }
})

const PsychologistSchema = new mongoose.Schema({
    userID:{
        type: mongoose.Types.ObjectId,
        ref : "user",
        required :true
    },
    name:{
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    }
    ,
    schedules : {
        type : [timeSlotSchema],
        required : true
    },
    appointmentsList : {
        type: [mongoose.Types.ObjectId],
        ref : "appointment",
        required :true
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
    PsychologistModel : mongoose.model("psychologist",PsychologistSchema),
    TimeSlotModel : mongoose.model("timeSlot",timeSlotSchema)
}