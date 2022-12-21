const Joi = require("@hapi/joi");
const createError = require("http-errors");
const createVideoSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان پادکست به صورت صحیح وارد نشده است")),
    coach : Joi.string().min(3).max(30).error(createError.BadRequest("نام راوی پادکست به صورت صحیح وارد نشده است")),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    information : Joi.string().error(createError.BadRequest("متن ارسال شده به صورت صحیح وارد نشده است")),
    fileUploadPath:Joi.allow(),
    price : Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد"))
         
});

module.exports = {
    createVideoSchema
}