const { deleteFileInPublic, copyOfObject, deleteInvalidData } = require("../../../utils/functions");
const Controller = require("../contoller");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createError = require("http-errors");
const {StatusCodes : HttpStatus} = require("http-status-codes");
const { createPsychologistSchema } = require("../../validators/admin/psychologist.schema");
const { PsychologistModel } = require("../../../models/psychologist");


class psychologistController extends Controller{
    async addPsychologist(req,res,next){
        try {
            const psychologistDataBody = await createPsychologistSchema.validateAsync(req.body);
            req.body.profileImage = (path.join(psychologistDataBody.fileUploadPath, psychologistDataBody.filename)).replace(/\\/g,"/");
            const profileImage = req.body.profileImage;
            const{name,degree,city,address,phoneNumber,visitAmount} = psychologistDataBody;
            const psychologist = await PsychologistModel.create({name,degree,city,address,phoneNumber,visitAmount,profileImage})
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "روانشناس با موفقیت افزوده شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req.body.profileImage)
            next(error)
        }
    }

    async getListOfPsychologists(req,res,next){
        try {
            const search = req?.query?.search || "";
            let psychologists;
            if(search){
                psychologists = await PsychologistModel.find({
                   $text : {
                       $search : new RegExp(search , "ig")
                   }
               })
            }else{
                psychologists = await PsychologistModel.find({})
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

    async deletePsychologistById(req,res,next){
        try {
            const {id} = req.params;
            await this.findPsychologistById(id);
            const result = await PsychologistModel.deleteOne({_id : id});
            if(result.deletedCount == 0 ) throw createError.InternalServerError("حذف روانشناس انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode :HttpStatus.OK,
                data:{
                    message : "حذف روانشناس با موفقیت انجام شد"    
                }
            }) 
            
        } catch (error) {
            next(error)
        }
    }

    async updatePsychologistById(req,res,next){
        try {
            const {id} = req.params;
            await this.findPsychologistById(id)
            if(req?.body?.fileUploadPath && req?.body?.filename){
                req.body.ptofileImage = (path.join(req.body.fileUploadPath, req.body.filename)).replace(/\\/g,"/");
            }
            const data = copyOfObject(req.body);
            deleteInvalidData(data , []);
            const updateResult = await PsychologistModel.updateOne({_id : id} , {$set : data})
            if (updateResult.modifiedCount == 0) throw {status : HttpStatus.INTERNAL_SERVER_ERROR , message : "خطای داخلی"}
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK ,
                data : {
                    message : "به روزرسانی روانشناس با موفقیت انجام شد"
                }
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.profileImage )
            next(error)
        }

    }

    async findPsychologistById(psychologistID){
        const {id} = await ObjectIdValidator.validateAsync({id : psychologistID});
        const psychologist = await PsychologistModel.findById(id);
        if(!psychologist) throw createError.NotFound("روانشناسی یافت نشد");
        return psychologist;
    }

    
}

module.exports = {
    AdminPsychologistController : new psychologistController()
}