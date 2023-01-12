const { EventModel } = require("../../../models/event");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const Controller = require("../contoller");
const { ObjectIdValidator } = require("../../validators/public.validator");
const { createTicketSchema } = require("../../validators/api/ticket.schema");
const { UserModel } = require("../../../models/user");
const { copyOfObject } = require("../../../utils/functions");

class eventsPageController extends Controller{
    async getListOfEvents(req,res,next){
        try {
            const {search} = req.query;
            let events;
            if(search) events = await EventModel.find({$text : {$search : search}}).sort({_id : -1})
            else events = await EventModel.find({}).sort({_id : -1})
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                   events 
                }
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

    async getTicket(req,res,next){
        try {
            const {eventID} = req.params;
            const event = await this.findEventById(eventID);
            if(event.capacity > 0){
                const ticketDataBody = await copyOfObject(createTicketSchema.validateAsync(req.body));
                const userID = req.user._id.toString();
                const UserTicketResult = await UserModel.updateOne({_id : userID} , {
                    $push : {
                        "joinedEvents" : eventID
                    }
                })
                if(UserTicketResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message :"خطای داخلی در اضافه کردن ایونت به یوزر"}
                console.log("edit user done")
                await this.updateCapacity(eventID);
                console.log("edit capacity done")
                const eventTicketResult = await EventModel.updateOne({_id : eventID} , {
                    $push : {
                        "tickets" : ticketDataBody
                    }
                })
                if(eventTicketResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message :" خطای داخلی در اضافه کردن تیکت به ایونت"}
                console.log("edit event done")
            }
            else throw createError.NotFound("ظرفیت رویداد مورد نظر تکمیل شده است ");
            return res.status(HttpStatus.CREATED).json({
                data : {
                    statusCode : HttpStatus.CREATED,
                    message : "بلیط رویداد با موفقیت ثبت شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async findEventById(eventID){
        const {id} = await ObjectIdValidator.validateAsync({id : eventID});
        const event = await EventModel.findById(id);
        if(!event) throw createError.NotFound("رویدادی یافت نشد");
        return event;
    }

    async updateCapacity(eventID){
        const event = await this.findEventById(eventID);
        const newCapacity = event.capacity - 1
        const updateCapacityResult = await EventModel.updateOne({_id : eventID} , {$set : {"capacity" : newCapacity}})
        if(updateCapacityResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message :"خطای داخلی در آپدیت ظرفیت ایونت"}
        return updateCapacityResult
    }

}

module.exports = {
    EventsPageController : new eventsPageController()
}