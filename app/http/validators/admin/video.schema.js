const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");
const createVideoSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان ویدیو به صورت صحیح وارد نشده است")),
    coach : Joi.string().min(3).max(30).error(createError.BadRequest("نام راوی ویدیو به صورت صحیح وارد نشده است")),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    information : Joi.string().error(createError.BadRequest("متن ارسال شده به صورت صحیح وارد نشده است")),
    fileUploadPath:Joi.allow(),
    price : Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد"))
         
});

const createVideoEpisodeSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان اپیزود به صورت صحیح وارد نشده است")),
    text : Joi.string().min(3).max(30).error(createError.BadRequest("توضیحات اپیزود به صورت صحیح وارد نشده است")),
    type : Joi.string().regex(/(Lock|Unlock)/i),
    chapterID : Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی فصل صحیح نمی باشد")),
    videoID : Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی ویدیو صحیح نمی باشد")),
    filename:Joi.string().pattern(/(\.mp4|\.mpg|\.mov|\.avi|\.mkv)$/).error(createError.BadRequest("فرمت ویدیو ارسال شده صحیح نمی باشد")),
    fileUploadPath:Joi.allow(),
         
});



module.exports = {
    createVideoSchema,
    createVideoEpisodeSchema
}