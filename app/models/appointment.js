const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    psychologist:{
        type: mongoose.Types.ObjectId,
        ref : "psychologist",
        required :true
    },
    patient:{
        type: mongoose.Types.ObjectId,
        ref : "user",
        required :true
    },
    appointmentDate: {
        type: Date,
        required: true,
    }
},{toJSON : {
    virtuals :true
}});



applicationSchema.index({appointmentStatus:"text"})

module.exports = {
    AppointmentModel : mongoose.model("appointment",appointmentSchema)
}