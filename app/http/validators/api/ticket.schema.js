const Joi = require("@hapi/joi");
const createError = require("http-errors");
const createTicketSchema = Joi.object({
    firstName : Joi.string().min(3).max(30).error(createError.BadRequest("نام شرکت کننده به صورت صحیح وارد نشده است")),
    lastName : Joi.string().min(3).max(30).error(createError.BadRequest("نام خانوادگی شرکت کننده به صورت صحیح وارد نشده است")),
    mobile : Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل وارد شده صحیح نمی باشد"))
    
         
});

module.exports = {
    createTicketSchema
}