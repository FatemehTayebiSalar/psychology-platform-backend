const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const Controller = require("../contoller");
const { updateProfileSchema } = require("../../validators/user/profile.schema");
const { UserModel } = require("../../../models/user");
const { copyOfObject, deleteInvalidData } = require("../../../utils/functions");

const ProfileBlackList = {
    MOBILE : "mobile", 
    OTP : "otp" , 
    ROLE : "role",
    JOINEDEVENTS : "joinedEvents",
    JOINEDPODCASTS : "joinedPodcasts",
    JOINEDVIDEOS: "joinedVideos"
};
Object.freeze(ProfileBlackList);

class profileContoller extends Controller{

    async getProfile(req,res,next){
        try {
            const userID = req.user._id;
            const profile = await (await UserModel.findOne({ _id : userID} , {"otp" : 0 , "role" : 0})).populate([{path : "joinedEvents" }]);
            
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    profile
                }
            })
        } catch (error) {
            next(error)
        }
    }



    async updateUserProfile(req,res,next){
        try {
            const userID = req.user._id
            await updateProfileSchema.validateAsync(req.body);
            const data = copyOfObject(req.body)
            let blackListFields = Object.values(ProfileBlackList);
            deleteInvalidData(data , blackListFields);
            console.log(data)
            const updateResult = await UserModel.updateOne({_id : userID} , {$set : data})
            if (updateResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "به روزرسانی کاربر با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }


        
    
    }
}


module.exports ={
    UserProfileContoller : new profileContoller()
}