const { VideoModel } = require("../../../models/video");
const Controller = require("../contoller");
const { AdminVideoController } = require("./video.controller");
const createError = require("http-errors");
const {StatusCodes : HttpStatus, StatusCodes} = require("http-status-codes");
const { deleteInvalidData } = require("../../../utils/functions");

class chapterController extends Controller {
    async addChapter(req,res,next){
        try {
            const{id,title,text} = req.body;
            await AdminVideoController.findVideoById(id);
            const saveChapterResult = await VideoModel.updateOne({_id : id} , {$push : {
                chapter : {title , text , episodes :[]}
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
            const {videoID} = req.params;
            const chapters = await this.getChaptersOfVideo(videoID)
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    chapters
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateChapterById(req,res,next){
        try {
            const {chapterID} = req.params;
            await this.getOneChapter(chapterID);
            const data = req.body;
            deleteInvalidData(data ,  ["_id"]);
            const updateChapterResult = await VideoModel.updateOne({"chapter._id" : chapterID},{
                $set : {"chapter.$" : data}
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
            const {chapterID} = req.params;
            const chapter = await this.getOneChapter(chapterID);
            const removeResult = await VideoModel.updateOne({"chapter._id" : chapterID} ,{
                $pull : {
                    chapter :{
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

    async getChaptersOfVideo(id){
        const chapters = await VideoModel.findOne({_id : id} , {chapter : 1 , title: 1})
        if (!chapters) throw createError.NotFound("ویدیویی با این شناسه یافت نشد")
        return chapters;
    }

    async getOneChapter(id){
        const chapter = await VideoModel.findOne({"chapter._id" : id},{"chapter.$" : 1})
        if(!chapter) throw new createError.NotFound("فصلی با این شناسه یافت نشد")
        return chapter;
    }
}

module.exports = {
    AdminChapterController : new chapterController()
}