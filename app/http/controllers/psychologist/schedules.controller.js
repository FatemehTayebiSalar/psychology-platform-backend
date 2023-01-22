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