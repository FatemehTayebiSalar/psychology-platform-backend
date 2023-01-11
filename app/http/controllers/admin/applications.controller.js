const Controller = require("../contoller");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { PsychologistModel } = require("../../../models/psychologist");
const { ApplicationModel } = require("../../../models/application");
const { AdminUserController } = require("./user.controller");
const { UserModel } = require("../../../models/user");
const { ROLES } = require("../../../utils/constants");


class applicationController extends Controller{

    async getApplications(req,res,next){
        try {
            const search = req?.query?.search || "";
            let applications;
            if(search){
                applications = await ApplicationModel.find({
                   $text : {
                       $search : new RegExp(search , "ig")
                   }
               })
            }else{
                applications = await ApplicationModel.find({})
            }
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data:{
                    applications
                }
            })
        } catch (error) {
            console.log(error)
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