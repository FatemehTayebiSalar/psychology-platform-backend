const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPattern } = require("../../../utils/constants");

const createRoleSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان نقش به صورت صحیح وارد نشده است")),
    permissions : Joi.array().items(Joi.string().pattern(MongoIDPattern)).error(new Error("دسترسی های ارسال شده صحیح نمی باشند"))
});

const createPermissionSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(new Error("عنوان دسترسی به صورت صحیح وارد نشده است")),
    description : Joi.string().min(0).max(100).error(new Error("توضیحات دسترسی به صورت صحیح وارد نشده است"))
});


module.exports = {
    createRoleSchema,
    createPermissionSchema
}