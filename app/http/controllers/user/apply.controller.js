const { ApplicationModel } = require("../../../models/application");
const { listOfImagesFromRequest } = require("../../../utils/functions");
const { createApplicationSchema } = require("../../validators/user/apply.schema");
const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const Controller = require("../contoller");

class applyContoller extends Controller{
    async applyPsychologistRole(req,res,next){
        try {
            const files = listOfImagesFromRequest(req?.files || [] , req.body.fileUploadPath);
            const applicant = req.user._id
            const applicationDataBody = await createApplicationSchema.validateAsync(req.body);
            const degreeImage = files[0]
            const cvFile = files[1]
            const profileImage = files[2]
            const{name,degree,city,address,phoneNumber,visitAmount} = applicationDataBody;
            const application = await ApplicationModel.create({applicant,name,degree,city,address,phoneNumber,visitAmount,degreeImage,cvFile,profileImage})
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "درخواست با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
        
    
    }
}


module.exports ={
    UserApplyContoller : new applyContoller()
}