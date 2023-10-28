const { createVideoEpisodeSchema } = require("../../validators/admin/video.schema");
const Controller = require("../contoller");
const path = require("path");
const { VideoModel } = require("../../../models/video");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { ObjectIdValidator } = require("../../validators/public.validator");
const { deleteInvalidData, copyOfObject, deleteFileInPublic } = require("../../../utils/functions");
const createError = require("http-errors");
const { PodcastModel } = require("../../../models/podcast");
const { createPodcastEpisodeSchema } = require("../../validators/admin/podcast.schema");
const { triggerAsyncId } = require("async_hooks");

class episodeController extends Controller {
    async addEpisode(req,res,next){
        try {
            const {modelName} = req.params
            const model = await this.getModelName(modelName)
            const validator = await this.getValidator(modelName)
            
            const{title , text , type , chapterID , mainFileID,filename,fileUploadPath} = await validator.validateAsync(req.body);
            const fileAddress = path.join(fileUploadPath,filename).replace(/\\/g,"/")
            const episode = {title,text , type ,fileAddress}
            const createEpisodeResult = await model.updateOne({_id : mainFileID , "chapters._id" : chapterID} , {
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
            console.log(error)
            deleteFileInPublic(req?.body?.fileAddress )
            next(error)
        }
    }

    async updateEpisodeById(req, res, next) {
        try {
            const {episodeID , modelName} = req.params
            const model = await this.getModelName(modelName);
            const episode = await this.findOneEpisodeById(modelName , episodeID)
            const { filename, fileUploadPath } = req.body
            let blackListFields = ["_id"]
            if(filename && fileUploadPath){
                const fileAddress = path.join(fileUploadPath, filename)
                req.body.fileAddress = fileAddress.replace(/\\/g, "/");
            }
            const data = req.body;
            deleteInvalidData(data, blackListFields)
            const newEpisode = {
                ...episode,
                ...data
            }
            const editEpisodeResult = await model.updateOne({
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
            console.log(error)
            next(error)
        }
    }

    async removeEpisode(req, res, next) {
        try {
            const {id : episodeID} = await ObjectIdValidator.validateAsync({id: req.params.episodeID});
            const {modelName} = req.params;
            const model = await this.getModelName(modelName);
            await this.findOneEpisodeById(modelName,episodeID)
            const removeEpisodeResult = await model.updateOne({
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

    async findOneEpisodeById(modelName , episodeID){
        const model = await this.getModelName(modelName)
        const result = await model.findOne({"chapters.episodes._id": episodeID}, {
            "chapters.$": 1
        })
        if(!result) throw new createError.NotFound("اپیزودی یافت نشد")
        const episode = await result?.chapters?.[0]?.episodes?.[0]
        if(!episode) throw new createError.NotFound("اپیزودی یافت نشد")
        return copyOfObject(episode)
    }



    async getModelName(modelName){
        let model
        if(modelName == "podcast") model = PodcastModel;
        else if(modelName == "video") model = VideoModel;
        return model
    }

    async getValidator(modelName){
        let validator
        if(modelName == "podcast") validator = createPodcastEpisodeSchema;
        else if(modelName == "video") validator = createVideoEpisodeSchema;
        return validator
    }
}


module.exports = {
    AdminEpisodeController : new episodeController()
}