const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");
const createPsychologistSchema = Joi.object({
    userID : Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی کاربر صحیح نمی باشد")),
    name : Joi.string().min(3).max(30).error(createError.BadRequest("نام روانشناس به صورت صحیح وارد نشده است")),
    degree : Joi.string().min(10).max(100).error(createError.BadRequest("مدرک روانشناس به صورت صحیح وارد نشده است")),
    city : Joi.string().min(3).max(30).error(createError.BadRequest("نام  شهر به صورت صحیح وارد نشده است")),
    address : Joi.string().min(10).max(100).error(createError.BadRequest("آدرس  به صورت صحیح وارد نشده است")),
    phoneNumber : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره تلفن وارد شده صحیح نمی باشد")),
    visitAmount : Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath:Joi.allow(),
    
         
});


module.exports = {
    createPsychologistSchema
}