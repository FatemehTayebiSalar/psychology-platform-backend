const Controller = require("../contoller");
const { ObjectIdValidator, createAppointmentSchema } = require("../../validators/public.validator");
const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { PsychologistModel } = require("../../../models/psychologist");
const { AppointmentModel } = require("../../../models/appointment");
const { AdminUserController } = require("./user.controller");
const { UserModel } = require("../../../models/user");
const { ROLES } = require("../../../utils/constants");


class appointmentController extends Controller{
;
    async addAppointment(req,res,next){
        try {
            const {psychologistID , patientID} = req.params
            const {appointmentDate,appointmentStatus} = req.body;
            const{psychologistID,patientID,appointmentDate,appointmentStatus} = eventDataBody;
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

    async getAppointments(req,res,next){
        try {
            const search = req?.query?.search || "";
            let appointments;
            if(search){
                appointments = await AppointmentModel.find({
                   $text : {
                       $search : new RegExp(search , "ig")
                   }
               })
            }else{
                appointments = await AppointmentModel.find({})
            }
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data:{
                    appointments
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getApplicationById(req,res,next){
        try {
            const {applicationID} = req.params;
            const application = await this.findApplicationById(applicationID);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data :{
                    application
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }    

    async responseToApplications(req,res,next){
        try {
            const{applicationID} = req.params
            const {response} = req.body;
            const application = await this.findApplicationById(applicationID);
            if(application.response !== "pending") throw createError.NotFound("درخواست قبلا پاسخ داده شده است");
            else{
                if(response == "Accepted"){
                    const application = await this.findApplicationById(applicationID);
                    await this.updateRoleForPsychologist(applicationID);
                    await this.createPsychologistForApplicant(applicationID)         
                }
                const setResponse = await ApplicationModel.updateOne({_id : applicationID} , {$set : {"response" : response}})
                if(setResponse.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
                return res.status(HttpStatus.OK).json({
                    statusCode : HttpStatus.OK,
                    data :{
                        message : "پاسخ مورد نظر برای درخواست ثبت شد"
                    }
                })
            }
            
        } catch (error) {
            next(error)
        }
    }

    async findApplicationById(aplicationID){
        const {id} = await ObjectIdValidator.validateAsync({id : aplicationID});
        const aplication = await ApplicationModel.findById(id);
        if(!aplication) throw createError.NotFound("درخواستی با این مشخصات یافت نشد");
        return aplication;
    }

    async updateRoleForPsychologist(applicationID){
        const application = await ApplicationModel.findOne({_id : applicationID});
        const applicantID = application.applicant.toString(); 
        await AdminUserController.findUserById(applicantID);
        const updateRole = await UserModel.updateOne({_id : applicantID} , {$set : {"role" : ROLES.PSYCHOLOGIST}})
        if (updateRole.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
        return updateRole;
    }

    async createPsychologistForApplicant(applicationID){
        const application = await this.findApplicationById(applicationID);
        const userID = application.applicant
        const {name,degree,city,address,phoneNumber,visitAmount,profileImage} = application;
        const psychologist = await PsychologistModel.create({userID,name,degree,city,address,phoneNumber,visitAmount,profileImage})
        if(!psychologist) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"} 
        return psychologist
    }
    
}

module.exports = {
    AdminApplicationController : new applicationController()
}