const { createVideoEpisodeSchema } = require("../../validators/admin/video.schema");
const Controller = require("../contoller");
const path = require("path");
const { VideoModel } = require("../../../models/video");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { ObjectIdValidator } = require("../../validators/public.validator");

class episodeController extends Controller {
    async addEpisode(req,res,next){
        try {
            const{title , text , type , chapterID , videoID,filename,fileUploadPath} = await createVideoEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath,filename).replace(/\\/g,"/")
            const episode = {title,text , type ,videoAddress}
            const createEpisodeResult = await VideoModel.updateOne({_id : videoID , "chapter._id" : chapterID} , {
                $push : {
                    "chapter.$.episodes" : episode
                }
            });
            if(createEpisodeResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "افزودن اپیزود انجام نشد"}
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data :{
                    message : "افزودن اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeEpisode(req,res,next){
        try {
            const{id : episodeID} = await ObjectIdValidator.validateAsync({id : req.params.episodeID});
            const removeEpisodeResult = await VideoModel.updateOne({
                "chapter.episodes._id" : episodeID
            }, {
                $pull : {
                    "chapter.$.episodes" : {
                        _id : episodeID
                    }
                }
            });
            if (removeEpisodeResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "حذف اپیزود انجام نشد"}
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    message :"حذف اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            
        }
    }
}

module.exports = {
    AdminEpisodeController : new episodeController()
}