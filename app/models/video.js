const mongoose = require("mongoose");

const Episodes = mongoose.Schema({
    title: {type: String , required : true},
    text : {type: String , required : true},
    type : {type : String , default : "Unlock"},
    videoAddress : {type : String , required :true}
},{toJSON : {
    virtuals : true
}})
Episodes.virtual("videoURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.videoAddress}`
})

const Chapters = mongoose.Schema({
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
    chapters :{type : [Chapters] , default:[]},
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

} , {toJSON : {
    virtuals :true
}});
VideoSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.coverImage}`
})
VideoSchema.index({title: "text" , coach : "text" , information : "text"})
module.exports = {
     VideoModel : mongoose.model("video",VideoSchema)
}