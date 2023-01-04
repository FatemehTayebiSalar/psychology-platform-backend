const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");
const createPodcastSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان پادکست به صورت صحیح وارد نشده است")),
    narrator : Joi.string().min(3).max(30).error(createError.BadRequest("نام راوی پادکست به صورت صحیح وارد نشده است")),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    information : Joi.string().error(createError.BadRequest("متن ارسال شده به صورت صحیح وارد نشده است")),
    fileUploadPath:Joi.allow(),
    price : Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد"))
         
});

const createPodcastEpisodeSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان اپیزود به صورت صحیح وارد نشده است")),
    text : Joi.string().min(3).max(30).error(createError.BadRequest("توضیحات اپیزود به صورت صحیح وارد نشده است")),
    type : Joi.string().regex(/(Lock|Unlock)/i),
    chapterID : Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی فصل صحیح نمی باشد")),
    mainFileID : Joi.string().regex(MongoIDPattern).error(createError.BadRequest("شناسه ی پادکست صحیح نمی باشد")),
    filename:Joi.string().pattern(/(\.mp3|\.aac|\.flac|\.alac|\.wav)$/).error(createError.BadRequest("فرمت پادکست ارسال شده صحیح نمی باشد")),
    fileUploadPath:Joi.allow(),
         
});

module.exports = {
    createPodcastEpisodeSchema,
    createPodcastSchema
}