const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    narrator: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    coverImage: {
         type: String,
         required: true
    },
    album: {
        type: String,
        required: true
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
        default:[]
    },
    dislike:{
        type: [mongoose.Types.ObjectId],
        default:[]
    },
    comments:{
        type:[],
        default:[]
    },
    bookmark : {
        type:[mongoose.Types.ObjectId],
        default:[]
    }
    //filepath
    
});
module.exports = {
    PodcastModel : mongoose.model("podcast",Schema)
}