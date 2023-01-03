const mongoose = require("mongoose");
const { ChaptersSchema } = require("./chapter");


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
    chapters :{
        type : [ChaptersSchema] ,
        default:[]
    },
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