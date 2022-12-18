const { createPodcastSchema } = require("../../validators/admin/podcast.schema");
const Controller = require("../contoller");
const path = require("path");
const { PodcastModel } = require("../../../models/podcast");
const { deleteFileInPublic } = require("../../../utils/functions");
const createError = require("http-errors")
class podcastController extends Controller{
    async addPodcast(req,res,next){
        try {
            const podcastDataBody = await createPodcastSchema.validateAsync(req.body);
            req.body.coverImage = (path.join(podcastDataBody.fileUploadPath, podcastDataBody.filename)).replace(/\\/g,"/");
            const coverImage = req.body.coverImage;
            const{title,information} = podcastDataBody;
            const narrator = req.user._id;
            const podcast = await PodcastModel.create({title,information,coverImage,narrator})
            return res.status(201).json({
                data : {
                    statusCode : 201,
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
            const podcasts = await PodcastModel.aggregate([
                {$match : {}},
                {
                    $lookup : {
                        from : "users",
                        foreignField: "_id",
                        localField : "narrator",
                        as : "narrator"
                    }
                },
                {
                    $unwind : "$narrator"
                },
                {
                    $project : {
                        "narrator.__v" : 0,
                        "narrator.otp" : 0,
                        "narrator.roles" : 0
                    }
                }
            ])
            return res.status(200).json({
                data:{
                    statusCode : 200,
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
            return res.status(200).json({
                data :{
                    statusCode : 200,
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
            return res.status(200).json({
                data:{
                    statusCode : 200,
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
            const data = req.body;
            let nullishData = ["", " " , "0" , 0 , null , undefined];
            let blackListFields = ["bookmark", "dislike" , "like" , "narrator"];
            Object.keys(data).forEach(key => {
                if(blackListFields.includes(key)) delete data[key];
                if(typeof data[key] == "string") data[key] = data[key].trim();
                if(nullishData.includes(data[key])) delete data[key];
                
            })
            const updateResult = await PodcastModel.updateOne({_id : id} , {$set : data})
            if (updateResult.modifiedCount == 0) throw createError.InternalServerError("به روزرسانی انجام نشد")
            return res.status(200).json({
                data : {
                    statusCode : 200,
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