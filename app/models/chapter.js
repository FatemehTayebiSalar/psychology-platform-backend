const mongoose = require("mongoose");

const EpisodesSchema = new mongoose.Schema({
    title: {type: String , required : true},
    text : {type: String , required : true},
    type : {type : String , default : "Unlock"},
    fileAddress : {type : String , required :true}
},{toJSON : {
    virtuals : true
}})

EpisodesSchema.virtual("fileURL").get(function(){
    return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.fileAddress}`
})

const ChaptersSchema = new mongoose.Schema({
    title : {type : String , required: true},
    text : {type :String , default : ""},
    episodes : {type: [EpisodesSchema] , default:[]}
})

module.exports = {
    ChaptersSchema
}