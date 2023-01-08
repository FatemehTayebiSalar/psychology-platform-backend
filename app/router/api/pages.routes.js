const { checkPermission } = require("../../http/middlewares/permission.guard");
const {EventPageApiRoutes} = require("./eventPage")


const router = require("express").Router();

router.use("/events" ,EventPageApiRoutes)

module.exports = {
    PageRoutes : router
}