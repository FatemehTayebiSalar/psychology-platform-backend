const { UserModel } = require("../../../models/user");
const Controller = require("../contoller");
const {StatusCodes : HttpStatus} = require("http-status-codes");

class userController extends Controller{
    async getAllUsers(req,res,next){
        try {
            const {search} = req.query;
            let users;
            if(search) users = await UserModel.find({$text : {$search : search}}).sort({_id : -1})
            else users = await UserModel.find({}).sort({_id : -1})
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data : {
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AdminUserController : new userController()
}