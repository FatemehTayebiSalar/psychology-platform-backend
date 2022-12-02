const createError = require("http-errors");
const { authSchema } = require("../../validators/user/auth.schema");
const Controller = require("../contoller");

module.exports = new class HomeController extends Controller{
   async indexPage(req,res,next){
        try {
        
            return res.status(200).send("Index Page Bavak")
        } catch (error) {
            next(error);
        }
    }
}