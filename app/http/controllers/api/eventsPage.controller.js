const { EventModel } = require("../../../models/event");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const Controller = require("../contoller");
const { ObjectIdValidator } = require("../../validators/public.validator");

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

    async findEventById(eventID){
        const {id} = await ObjectIdValidator.validateAsync({id : eventID});
        const event = await EventModel.findById(id);
        if(!event) throw createError.NotFound("رویدادی یافت نشد");
        return event;
    }

}

module.exports = {
    EventsPageController : new eventsPageController()
}