const { VideoModel } = require("../../../models/video");
const Controller = require("../contoller");
const { AdminVideoController } = require("./video.controller");
const createError = require("http-errors");
const {StatusCodes : HttpStatus, StatusCodes} = require("http-status-codes");

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
}

module.exports = {
    AdminChapterController : new chapterController()
}