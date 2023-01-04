const { VideoModel } = require("../../../models/video");
const Controller = require("../contoller");
const { AdminVideoController } = require("./video.controller");
const createError = require("http-errors");
const {StatusCodes : HttpStatus, StatusCodes} = require("http-status-codes");
const { deleteInvalidData, getModelName, copyOfObject } = require("../../../utils/functions");
const { AdminPodcastController } = require("./podcast.controller");

class chapterController extends Controller {
    async addChapter(req,res,next){
        try {
            const {modelName} = req.params;
            const model = await getModelName(modelName)
            const{mainFileID,title,text} = req.body;
            if(modelName == "video") await AdminVideoController.findVideoById(mainFileID);
            else if(modelName == "podcast") await AdminPodcastController.findPodcast({_id : mainFileID})
            const saveChapterResult = await model.updateOne({_id : mainFileID} , {$push : {
                chapters : {title , text , episodes :[]}
            }})
            if(saveChapterResult.modifiedCount == 0) throw createError.InternalServerError('فصل افزوده نشد');
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "فصل با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getListOfChapters(req,res,next){
        try {
            const {modelName,mainFileID} = req.params;
            const chapters = await this.getChaptersOfModel(modelName,mainFileID)
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data:{
                    result : chapters
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getChapterById(req,res,next){
        try {
            const {modelName,chapterID} = req.params;
            const chapter = await this.getOneChapter(modelName,chapterID);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data :{
                    chapter
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async updateChapterById(req,res,next){
        try {
            const {modelName,chapterID} = req.params;
            const model = await getModelName(modelName)
            const chapter = await this.getOneChapter(modelName,chapterID);
            const data = req.body;
            deleteInvalidData(data ,  ["_id"]);
            const newChapter = {
                ...chapter,
                ...data
            }
            const updateChapterResult = await model.updateOne({"chapters._id" : chapterID},{
                $set : {"chapters.$" : newChapter}
            })
            if(updateChapterResult.modifiedCount == 0) throw new createError.InternalServerError("به روزرسانی فصل انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message : "به روزرسانی با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removeChapterById(req,res,next){
        try {
            const {modelName,chapterID} = req.params;
            const model = await getModelName(modelName);
            const chapter = await this.getOneChapter(modelName,chapterID);
            const removeResult = await model.updateOne({"chapters._id" : chapterID} ,{
                $pull : {
                    chapters :{
                        _id : chapterID
                    }
                }
            })
            if(removeResult.modifiedCount == 0) throw new createError.InternalServerError("حذف فصل انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data: {
                    message : "حذف فصل با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getChaptersOfModel(modelName,mainFileID){
        const model = await getModelName(modelName)
        const chapters = await model.findOne({_id : mainFileID} , {chapters : 1 , title: 1})
        if (!chapters) throw createError.NotFound("ویدیو یا پادکستی با این شناسه یافت نشد")
        return chapters;
    }

    async getOneChapter(modelName,id){
        const model = await getModelName(modelName);
        const result = await model.findOne({"chapters._id" : id},{"chapters.$" : 1})
        if(!result) throw new createError.NotFound("فصلی با این شناسه یافت نشد")
        const chapter = await result?.chapters?.[0]
        if(!chapter) throw new createError.NotFound("فصلی با این شناسه یافت نشد")
        return copyOfObject(chapter)
    }

}

module.exports = {
    AdminChapterController : new chapterController()
}