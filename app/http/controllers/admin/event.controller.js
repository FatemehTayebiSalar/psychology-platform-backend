const { EventModel } = require("../../../models/event");
const { createEventSchema } = require("../../validators/admin/event.schema");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const Controller = require("../contoller");
const { deleteFileInPublic, copyOfObject, deleteInvalidData } = require("../../../utils/functions");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createError = require("http-errors");

class eventController extends Controller{

    async addEvent(req,res,next){
        try {
            const eventDataBody = await createEventSchema.validateAsync(req.body);
            req.body.coverImage = (path.join(eventDataBody.fileUploadPath, eventDataBody.filename)).replace(/\\/g,"/");
            const coverImage = req.body.coverImage;
            const{title,information,organizer,date,address,price,capacity} = eventDataBody;
            const event = await EventModel.create({title,information,organizer,date,address,price,capacity,coverImage})
            return res.status(HttpStatus.CREATED).json({
                data : {
                    statusCode : HttpStatus.CREATED,
                    message : "رویداد با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.coverImage)
            next(error)
        }
    }

    async getListOfEvents(req,res,next){
        try {
            const {search} = req.query;
            let events;
            if(search) events = await EventModel.find({$text : {$search : search}}).sort({_id : -1})
            else events = await EventModel.find({}).sort({_id : -1})
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                events
            })
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req,res,next){
        try {
            const {id} = req.params;
            const event = await this.findEventById(id);
            return res.status(HttpStatus.OK).json({
                data :{
                    statusCode : HttpStatus.OK,
                    event
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async updateEventById(req,res,next){
        try {
            const {id} = req.params;
            await this.findEventById(id)
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.coverImage = (path.join(req.body.fileUploadPath, req.body.filename)).replace(/\\/g,"/");
            }
            const data = copyOfObject(req.body);
            deleteInvalidData(data , []);
            const updateResult = await EventModel.updateOne({_id : id} , {$set : data})
            if (updateResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                data : {
                    statusCode : HttpStatus.OK ,
                    message : "به روزرسانی رویداد با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.coverImage )
            next(error)
        }

    }

    async deleteEventById(req,res,next){
        try {
            const {id} = req.params;
            await this.findEventById(id);
            const result = await EventModel.deleteOne({_id : id});
            if(result.deletedCount == 0 ) throw createError.InternalServerError("حذف رویداد انجام نشد");
            return res.status(HttpStatus.OK).json({
                data:{
                    statusCode :HttpStatus.OK,
                    message : "حذف رویداد با موفقیت انجام شد"    
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async findEventById(eventID){
        const {id} = await ObjectIdValidator.validateAsync({id : eventID});
        const event = await EventModel.findById(id);
        if(!event) throw createError.NotFound("رویدادی یافت نشد");
        return event;
    }

    
}

module.exports = {
    AdminEventController : new eventController()
}