const mongoose = require("mongoose");

const Episodes = mongoose.Schema({
    title: {type: String , required : true},
    text : {type: String , required : true},
    type : {type : String , default : "Unlock"},
    videoAddress : {type : String , required :true}
})

const Chapter = mongoose.Schema({
    title : {type : String , required: true},
    text : {type :String , default : ""},
    episodes : {type: [Episodes] , default:[]}
})

const VideoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true
    },
    information: {
        type: String,
        required: true
    },
    coverImage:{
        type : String,
        required : true
    },
    chapter :{type : [Chapter] , default:[]},
    price: {
        type: Number,
        default: 0 
    },
    like:{
        type: [mongoose.Types.ObjectId],
        default:[]
    },
    dislike:{
        type: [mongoose.Types.ObjectId],
        default:[]
    },
    bookmark : {
        type:[mongoose.Types.ObjectId],
        default:[]
    }

});
VideoSchema.index({title: "text" , coach : "text" , information : "text"})
module.exports = {
     VideoModel : mongoose.model("video",VideoSchema)
}