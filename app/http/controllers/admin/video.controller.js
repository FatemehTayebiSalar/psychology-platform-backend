const { deleteFileInPublic, copyOfObject, deleteInvalidData } = require("../../../utils/functions");
const { createVideoSchema } = require("../../validators/admin/video.schema");
const Controller = require("../contoller");
const path = require("path");
const { VideoModel } = require("../../../models/video");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const object = require("@hapi/joi/lib/types/object");
const VideoBlackList = {
    BOOKMARK : "bookmark", 
    DISLIKE : "dislike" , 
    LIKE : "like"
};
Object.freeze(VideoBlackList);

class videoController extends Controller{
    async addVideo(req,res,next){
        try {
            const videoDataBody = await createVideoSchema.validateAsync(req.body);
            req.body.coverImage = (path.join(videoDataBody.fileUploadPath, videoDataBody.filename)).replace(/\\/g,"/");
            const coverImage = req.body.coverImage;
            const{title,information,price,coach} = videoDataBody;
            const video = await VideoModel.create({title,information,coverImage,coach,price})
            return res.status(HttpStatus.CREATED).json({
                data : {
                    statusCode : HttpStatus.CREATED,
                    message : "ویدیو با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.coverImage)
            next(error)
        }
    }

    async getListOfVideos(req,res,next){
        try {
            const search = req?.query?.search || "";
            let videos;
            if(search){
               videos = await VideoModel.find({
                   $text : {
                       $search : new RegExp(search , "ig")
                   }
               })
            }else{
                videos = await VideoModel.find({})
            }
            
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode : HttpStatus.OK,
                    videos
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getVideoById(req,res,next){
        try {
            const {id} = req.params;
            const video = await this.findVideoById(id);
            return res.status(HttpStatus.OK).json({
                data :{
                    statusCode : HttpStatus.OK,
                    video
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async deleteVideoById(req,res,next){
        try {
            const {id} = req.params;
            await this.findVideoById(id);
            const result = await VideoModel.deleteOne({_id : id});
            if(result.deletedCount == 0 ) throw createError.InternalServerError("حذف ویدیو انجام نشد");
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode :HttpStatus.OK,
                    message : "حذف ویدیو با موفقیت انجام شد"    
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async updateVideoById(req,res,next){
        try {
            const {id} = req.params;
            await this.findVideoById(id)
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.coverImage = (path.join(req.body.fileUploadPath, req.body.filename)).replace(/\\/g,"/");
            }
            const data = copyOfObject(req.body);
            let blackListFields = Object.values(VideoBlackList);
            deleteInvalidData(data , blackListFields);
            const updateResult = await VideoModel.updateOne({_id : id} , {$set : data})
            if (updateResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                data : {
                    statusCode : HttpStatus.OK ,
                    message : "به روزرسانی پادکست با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.coverImage )
            next(error)
        }

    }

    async findVideoById(videoID){
        const {id} = await ObjectIdValidator.validateAsync({id : videoID});
        const video = await VideoModel.findById(id);
        if(!video) throw createError.NotFound("ویدیویی یافت نشد");
        return video;
    }

    
}

module.exports = {
    AdminVideoController : new videoController()
}