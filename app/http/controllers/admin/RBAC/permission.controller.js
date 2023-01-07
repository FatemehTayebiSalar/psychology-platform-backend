const Controller = require("../../contoller")
const {StatusCodes : HttpStatus} = require("http-status-codes");
const createError = require("http-errors");
const { PermissionModel } = require("../../../../models/permission");
const { createPerrmissionSchema, createPermissionSchema } = require("../../../validators/admin/RBAC.schema");

class permissionController extends Controller{
    async getListOfPermissions(req,res,next){
        try {
            const permissions = await PermissionModel.find({});
            return res.status(HttpStatus.OK).json({
                StatusCode : HttpStatus.OK,
                data : {
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async createNewPermission(req,res,next){
        try {
            const{title,description} = await createPermissionSchema.validateAsync(req.body)
            await this.findPermissionWithTitle(title)
            const permission = await PermissionModel.create({title , description})
            if(!permission) throw createError.InternalServerError("سطح دسترسی ایجاد نشد")
            return res.status(HttpStatus.CREATED).json({
                statusCode : HttpStatus.CREATED,
                data : {
                    message : "سطح دسترسی با موفقیت ایجاد شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async findPermissionWithTitle(title){
        const permission = await PermissionModel.findOne({title});
        if(permission) throw createError.BadRequest("سطح دسترسی قبلا ثبت شده است")
    }

}

module.exports = {
    AdminPermissionController : new permissionController()
};
