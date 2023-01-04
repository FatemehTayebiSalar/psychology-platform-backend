const { createPodcastSchema } = require("../../validators/admin/podcast.schema");
const Controller = require("../contoller");
const path = require("path");
const { PodcastModel } = require("../../../models/podcast");
const { deleteFileInPublic, copyOfObject, deleteInvalidData } = require("../../../utils/functions");
const createError = require("http-errors")
const {StatusCodes : HttpStatus} = require("http-status-codes");
const PodcastBlackList = {
    BOOKMARK : "bookmark", 
    DISLIKE : "dislike" , 
    LIKE : "like"
};
Object.freeze(PodcastBlackList);
class podcastController extends Controller{
    async addPodcast(req,res,next){
        try {
            const podcastDataBody = await createPodcastSchema.validateAsync(req.body);
            req.body.coverImage = (path.join(podcastDataBody.fileUploadPath, podcastDataBody.filename)).replace(/\\/g,"/");
            const coverImage = req.body.coverImage;
            const{title,information,price,narrator} = podcastDataBody;
            const podcast = await PodcastModel.create({title,information,coverImage,narrator,price})
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "پادکست با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.coverImage)
            next(error)
        }
    }

    async getListOfPodcasts(req,res,next){
        try {
            const {search} = req.query;
            let podcasts;
            if(search) podcasts = await PodcastModel.find({$text : {$search : search}}).sort({_id : -1})
            else podcasts = await PodcastModel.find({}).sort({_id : -1})
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    podcasts
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getPodcastById(req,res,next){
        try {
            const {id} = req.params;
            const podcast = await this.findPodcast({_id : id});
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data :{
                    podcast
                }
            })            
        } catch (error) {
            next(error)
        }
    }

    async deletePodcastById(req,res,next){
        try {
            const {id} = req.params;
            await this.findPodcast({_id : id});
            const result = await PodcastModel.deleteOne({_id : id});
            if(result.deletedCount == 0 ) throw createError.InternalServerError("حذف پادکست انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode :HttpStatus.OK,
                data:{
                    message : "حذف پادکست با موفقیت انجام شد"    
                }
            }) 
        } catch (error) {
            next(error)
        }
    }

    async updatePodcastById(req,res,next){
        try {
            const {id} = req.params;
            await this.findPodcast({_id : id})
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.coverImage = (path.join(req.body.fileUploadPath, req.body.filename)).replace(/\\/g,"/");
            }
            const data = copyOfObject(req.body);
            let blackListFields = Object.values(PodcastBlackList);
            deleteInvalidData(data , blackListFields);
            const updateResult = await PodcastModel.updateOne({_id : id} , {$set : data})
            if (updateResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "به روزرسانی پادکست با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.coverImage )
            next(error)
        }
    }

    async findPodcast(query = {}){
        const podcast = await PodcastModel.findOne(query).populate({path : "narrator" , select : ['mobile' , 'firsName' , 'lastName']});
        if(!podcast) throw createError.NotFound("پادکستی یافت نشد");
        return podcast;
    }

    
}

module.exports = {
    AdminPodcastController : new podcastController()
}