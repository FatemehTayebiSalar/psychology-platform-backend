const homeController = require("../../http/controllers/api/home.controller");
const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router =  require("express").Router();


router.get("/",veifyAccessToken,homeController.indexPage);
module.exports = {
    HomeRoutes : router
}