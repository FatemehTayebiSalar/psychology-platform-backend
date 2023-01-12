const Joi = require("@hapi/joi");
const createError = require("http-errors");

const updateProfileSchema = Joi.object({
    email : Joi.string().email().error(createError.BadRequest("ایمیل وارد شده صحیح نمی باشد")),
    firstName :  Joi.string().min(3).max(20).error(createError.BadRequest("نام به صورت صحیح وارد نشده است")),
    lastName :  Joi.string().min(3).max(20).error(createError.BadRequest("نام خانوادگی به صورت صحیح وارد نشده است")),
})

module.exports = {
    updateProfileSchema
}