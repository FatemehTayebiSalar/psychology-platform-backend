const Joi = require("@hapi/joi");
const createHttpError = require("http-errors");
const { MongoIDPattern } = require("../../utils/constants");
const ObjectIdValidator = Joi.object({
    id : Joi.string().pattern(MongoIDPattern).error(new Error(createHttpError.BadRequest("شناسه وارد شده صحیح نمی باشد")))
})

module.exports ={
    ObjectIdValidator
}