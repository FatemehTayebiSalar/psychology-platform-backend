const Controller = require("../contoller");

module.exports = new class HomeController extends Controller{
    indexPage(req,res,next){
        return res.status(200).send("Index Page Bavak")
    }
}