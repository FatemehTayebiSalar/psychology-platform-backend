const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
    title : {type : String , required : true},
    owner : {type : mongoose.Types.ObjectId , ref : "user" , required : true},
    tracks : {type : [mongoose.Types.ObjectId] , ref : "podcasts" , required : true}
})//you should create seprate album schema for both podcast an video album like category section in course

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    narrator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref : "user"
    },
    coverImage: {
         type: String,
         required: true
    },
    album: {
        type: AlbumSchema,
        default : null
    },
    information: {
        type: String,
        required: true
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
    
});

module.exports = {
    PodcastModel : mongoose.model("podcast",Schema)
}