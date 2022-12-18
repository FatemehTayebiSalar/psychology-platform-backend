const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    email:{
        type: String,
        lowercase:true
    },
    password: {
        type: String
    },
    mobile: {
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
        type: String
    },
    lastName: {
        type: String
    },
    
    roles:{
        type:[String],
        default:["USER"]
    },
    //bills :{
    //    type : [],
    //    default:[]
    //},

    // joinedEvents:{
    //     type : [],
    //     default:[]    
            
    // }
    // ,

    // joinedPodcasts:{
    //     type : [],
    //     default:[]    
            
    // },

    // joinedVideos:{
    //     type : [],
    //     default:[]    
            
    // }
    
});
module.exports = {
    UserModel : mongoose.model("user",Schema)
}