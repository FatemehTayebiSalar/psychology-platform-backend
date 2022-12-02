const { tryWithPath } = require("@hapi/joi/lib/common");
const createError = require("http-errors");
const { UserModel } = require("../../../../models/user");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constants");
const { randomNumberGenerator, signAccessToken } = require("../../../../utils/functions");
const {getOtpSchema,checkOtpSchema} = require("../../../validators/user/auth.schema");
const Controller = require("../../contoller");
class UserAuthContoller extends Controller{
    async getOtp(req,res,next){
        try {
            await getOtpSchema.validateAsync(req.body)
            const {mobile} = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(mobile,code);
            if(!result) throw createError.U("ورود شما انجام نشد")
            return res.status(200).send({
                data:{
                    statusCode : 200,
                    message : "کد اعتبارسنجی با موفقیت برای شما ارسال شد",
                    code,
                    mobile
                }
            })
        } catch (error) {
            next(error);
        }
    }
    async checkOtp(req,res,next){
        try {
            await checkOtpSchema.validateAsync(req.body);
            const {mobile,code} = req.body;
            const user = await UserModel.findOne({mobile});
            if(!user) throw createError.NotFound("کاربر یافت نشد");
            if(user.otp.code != code) throw createError.Unauthorized("کد ارسال شده صحیح نمی باشد")
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("کد شما منقضی شده است")
            const accessToken = await signAccessToken(user._id)
            return res.json({
                data: {accessToken}
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile,code){
        let otp = {
            code,
            expiresIn : EXPIRES_IN
        }
        const result = await this.checkExistUser(mobile);
        if(result){
            return ( await this.updateUser(mobile,{otp }))
        }
        return !!(await UserModel.create({
            mobile,
            otp,
            Roles : [USER_ROLE]
        }))
        
    }
    async checkExistUser(mobile){
        const user = await UserModel.findOne({mobile});
        return !!user
    }
    async updateUser(mobile, objectData = {}){
        Object.keys(objectData).forEach(key =>{
            if([""," ",0,null,undefined,"0",NaN].includes(objectData[key])) delete objectData[key]
        })
        const updateResult = await UserModel.updateOne({mobile},{$set : objectData})
        return !!updateResult.modifiedCount
    }
}

module.exports ={
    UserAuthContoller : new UserAuthContoller()
}