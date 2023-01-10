const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    applicant:{
        type: mongoose.Types.ObjectId,
        ref : "user",
        required :true
    },
    degreeImage : {type :String , required :true},
    cvFile : {type : String , required :true},
    information : {
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
    },
    response : {
        type : String,
        default : ""
    }
},{toJSON : {
    virtuals :true
}})

applicationSchema.virtual("degreeImageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.degreeImage}`
})

applicationSchema.virtual("cvFileURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.cvFile}`
})

applicationSchema.virtual("profileImageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.information.profileImage}`
})

applicationSchema.index({response:"text" , degree : "text" , name : "text"})

module.exports = {
    ApplicationModel : mongoose.model("application",applicationSchema)
}