const mongoose = require("mongoose");
const { ChaptersSchema } = require("./chapter");

const PodcastSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    narrator: {
        type: String,
        required: true
    },
    coverImage: {
         type: String,
         required: true
    },
    information: {
        type: String,
        required: true
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
        default:[],
        ref : "user"
    },
    dislike:{
        type: [mongoose.Types.ObjectId],
        default:[],
        ref : "user"
    },
    bookmark : {
        type:[mongoose.Types.ObjectId],
        default:[],
        ref : "user" 
    }
    
} , {toJSON : {
    virtuals :true
}});

PodcastSchema.virtual("imageURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.coverImage}`
})

PodcastSchema.index({title:"text" , information : "text" , narrator :"text"})

module.exports = {
    PodcastModel : mongoose.model("podcast",PodcastSchema)
}