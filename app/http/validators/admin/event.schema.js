const Joi = require("@hapi/joi");
const createError = require("http-errors");
const createEventSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان رویداد به صورت صحیح وارد نشده است")),
    information : Joi.string().error(createError.BadRequest("متن ارسال شده به صورت صحیح وارد نشده است")),
    organizer : Joi.string().min(3).max(30).error(createError.BadRequest("نام  برگزار کننده ی رویداد به صورت صحیح وارد نشده است")),
    date : Joi.date().error(createError.BadRequest("تاریخ وارد شده صحیح نمی باشد")),
    address : Joi.string().min(10).max(100).error(createError.BadRequest("آدرس رویداد به صورت صحیح وارد نشده است")),
    price : Joi.number().error(createError.BadRequest("قیمت وارد شده صحیح نمی باشد")),
    capacity : Joi.number().error(createError.BadRequest("ظرفیت وارد شده صحیح نمی باشد")),
    filename:Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمی باشد")),
    fileUploadPath:Joi.allow(),
    
         
});

module.exports = {
    createEventSchema
}