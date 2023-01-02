const { createVideoEpisodeSchema } = require("../../validators/admin/video.schema");
const Controller = require("../contoller");
const path = require("path");
const { VideoModel } = require("../../../models/video");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { ObjectIdValidator } = require("../../validators/public.validator");
const { deleteInvalidData, copyOfObject, deleteFileInPublic } = require("../../../utils/functions");
const createError = require("http-errors");

class episodeController extends Controller {
    async addEpisode(req,res,next){
        try {
            const{title , text , type , chapterID , videoID,filename,fileUploadPath} = await createVideoEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath,filename).replace(/\\/g,"/")
            const episode = {title,text , type ,videoAddress}
            const createEpisodeResult = await VideoModel.updateOne({_id : videoID , "chapters._id" : chapterID} , {
                $push : {
                    "chapters.$.episodes" : episode
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
            deleteFileInPublic(req?.body?.videoAddress )
            next(error)
        }
    }

    async updateEpisodeById(req, res, next) {
        try {
            const {episodeID} = req.params
            const episode = await this.findOneEpisodeById(episodeID)
            const { filename, fileUploadPath } = req.body
            let blackListFields = ["_id"]
            if(filename && fileUploadPath){
                const fileAddress = path.join(fileUploadPath, filename)
                req.body.videoAddress = fileAddress.replace(/\\/g, "/");
            }
            const data = req.body;
            deleteInvalidData(data, blackListFields)
            const newEpisode = {
                ...episode,
                ...data
            }
            const editEpisodeResult = await VideoModel.updateOne({
                "chapters.episodes._id": episodeID
            }, {
                $set: {
                    "chapters.$.episodes" : newEpisode
                }
            })
            if (!editEpisodeResult.modifiedCount) throw new createError.InternalServerError("ویرایش اپیزود انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "ویرایش اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeEpisode(req, res, next) {
        try {
            const {id: episodeID} = await ObjectIdValidator.validateAsync({
                id: req.params.episodeID
            });
            await this.findOneEpisodeById(episodeID)
            const removeEpisodeResult = await VideoModel.updateOne({
                "chapters.episodes._id": episodeID,
            }, {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeID
                    }
                }
            });

            if (removeEpisodeResult.modifiedCount == 0)
                throw new createError.InternalServerError("حذف اپیزود انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "حذف اپیزود با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findOneEpisodeById(episodeID){
        const video = await VideoModel.findOne({"chapters.episodes._id": episodeID}, {
            "chapters.$": 1
        })
        if(!video) throw new createError.NotFound("اپیزودی یافت نشد")
        const episode = await video?.chapters?.[0]?.episodes?.[0]
        if(!episode) throw new createError.NotFound("اپیزودی یافت نشد")
        return copyOfObject(episode)
    }
}


module.exports = {
    AdminEpisodeController : new episodeController()
}