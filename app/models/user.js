const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type: Object ,
        default: {
            code:0,
            expires:0
        }
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roles:{
        type:[String],
        default:["USER"]
    },
    //bills :{
    //    type : [],
    //    default:[]
    //},

    joinedEvents:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],

    joinedPodcasts:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Podcast'
        }
    ],

    joinedVideos:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
    
});
module.exports = {
    UserModel : mongoose.model("user",Schema)
}