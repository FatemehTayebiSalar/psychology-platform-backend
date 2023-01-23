const { ApplicationModel } = require("../../../models/application");
const { listOfImagesFromRequest, createTimeSlots, getRepeatIndex } = require("../../../utils/functions");
const { createApplicationSchema } = require("../../validators/user/apply.schema");
const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const Controller = require("../contoller");
const { PsychologistModel, TimeSlotModel } = require("../../../models/psychologist");

class scheduleContoller extends Controller{

    async addSchedule(req,res,next){
        try {
            const psychologistID = req.user._id;
            const {date , startHour,startMinute, endHour,endMinute , repeatIndex} = req.body
            const timeData = await createTimeSlots(startHour,startMinute, endHour,endMinute)
            const timeSlots = await this.addTimeSlot(date,timeData,repeatIndex)
            let notMatch = false
            for(let i=0 ; i < timeSlots.length ; i++){
                const updatescheduleResult = await PsychologistModel.updateOne({userID : psychologistID} ,{
                $push : {
                    "schedules" : timeSlots[i]
                }})
                if (updatescheduleResult.modifiedCount == 0){
                    notMatch = true
                    break; 
                } 
            } 
            if(notMatch == true) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
            return res.status(HttpStatus.CREATED).json({
                data : {
                    statusCode : HttpStatus.CREATED,
                    message : "زمان های مشاوره با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            console.log(error)
            next(error)
        }

         
    }
    async getschedules(req,res,next){
                try {
                    const id = req.user._id
                    const schedules = await PsychologistModel.findOne({userID : id} , {schedules : 1}).sort({_id : -1})
                    return res.status(HttpStatus.OK).json({
                        statusCode : HttpStatus.OK,
                        data : {
                        schedules
                        }
                    })
                } catch (error) {
                    next(error)
                }
    }

    async removeScheduleById(req,res,next){
        try {
            const id = req.user._id
            const {scheduleID} = req.params;
            const removeResult = await PsychologistModel.updateOne({userID : id} ,{
                $pull : {
                    schedules :{
                        _id : scheduleID
                    }
                }
            })
            if(removeResult.modifiedCount == 0) throw new createError.InternalServerError("حذف تایم انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data: {
                    message : "حذف تایم با موفقیت انجام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }



    // async deleteExpireTimeSlots(req,res,next){
    //     try {
    //         const id = req.user._id
    //         const date = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    //         const day = parseInt((date.split("/"))[2])
    //         const month = parseInt((date.split("/"))[1])
    //         const year = parseInt((date.split("/"))[0])
    //         const scheduleData = await PsychologistModel.findOne({userID : id} , {schedule : 1})
    //         for(let i=0 ; i<scheduleData.length ; i++){
    //             const scheduleID = scheduleData[i]._id
    //             const scheduleDay = parseInt((scheduleData[i].date.split("/"))[2])
    //             const scheduleMonth = parseInt((scheduleData[i].date.split("/"))[1])
    //             const scheduleYear = parseInt((scheduleData[i].date.split("/"))[0])
    //             let expire = false
    //             if(scheduleYear < year) expire = true
    //             else if(scheduleMonth < month) expire = true
    //             else if(scheduleDay < day) expire = true
    //             if(expire == true){
    //                 await PsychologistModel.updateOne({userID : id},{
    //                     $pull : {
    //                         schedules :{
    //                             _id : scheduleiD
    //                         }
    //                     }
    //                 });
    //                 await TimeSlotModel.deleteOne({_id : scheduleID}); 
    //             }
    //         }
    //     } catch (error) {
    //         next(error)
    //     }
        
    // }




    async addTimeSlot(date , timeData , repeatIndex){
        const takenDay = parseInt((date.split("/"))[2])
        let day = takenDay
        let month = parseInt((date.split("/"))[1])
        let year = parseInt((date.split("/"))[0])
        let takenDate = date
        let timeSlots = []
        let time
        const index = getRepeatIndex(repeatIndex)
        for(let m=0 ; m<timeData.length ; m++){
            if(repeatIndex == "بدون تکرار"){
                time = await TimeSlotModel.create({date : takenDate,startTime : timeData[m]})
                timeSlots.push(time)
            }
            else{
                for(let i=0 ; i<30 ; i += index){
                    day = takenDay + i;
                    if(month <7 && day > 31){
                        month = month + 1
                        day = day%31
                    }
                    else if(month>6 && month<12 && day > 30){
                        month = month + 1
                        day = day%30
                    }
                    else if(month == 12 && day>29) break 
                    takenDate = `${year}/${month}/${day}`
                    time = await TimeSlotModel.create({date : takenDate,startTime : timeData[m]})
                    timeSlots.push(time)
                    
                }
            }
        }
        return timeSlots
    }

       
        
        
   

}


module.exports ={
    PsychologistScheduleContoller : new scheduleContoller()
}