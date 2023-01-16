const { PsychologistModel } = require("../../../models/psychologist");
const Controller = require("../contoller");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const createError = require("http-errors");
const { ObjectIdValidator } = require("../../validators/public.validator");


class psychologistsPageController extends Controller{
    async getListOfPsychologists(req,res,next){
        try {
            const search = req?.query?.search || "";
            let psychologists;
            if(search){
                psychologists = await PsychologistModel.find({
                   $text : {
                       $search : new RegExp(search , "ig")
                   }
               },{userID : 0 , profileImage : 0 , __v : 0 , city : 0 , address : 0 ,phoneNumber : 0 ,visitAmount : 0 ,schedules : 0 ,appointmentsList : 0 })
            }else{
                psychologists = await PsychologistModel.find({},{userID : 0 , __v : 0 , city : 0 , address : 0 ,phoneNumber : 0 ,visitAmount : 0 ,schedules : 0 ,appointmentsList : 0})
            }
            
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data:{
                    psychologists
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async getPsychologistById(req,res,next){
        try {
            const {id} = req.params;
            const psychologist = await this.findPsychologistById(id);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data :{
                    psychologist
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async findPsychologistById(psychologistID){
        const {id} = await ObjectIdValidator.validateAsync({id : psychologistID});
        const psychologist = await PsychologistModel.findById(id , {userID : 0 , profileImage : 0 , appointmentsList : 0 , __v : 0});
        if(!psychologist) throw createError.NotFound("روانشناسی یافت نشد");
        return psychologist;
    }
}

module.exports = {
    PsychologistsPageController : new psychologistsPageController()
}