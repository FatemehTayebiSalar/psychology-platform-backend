const { checkPermission } = require("../../http/middlewares/permission.guard");
const {EventPageApiRoutes} = require("./eventPage")
const {VideoPageApiRoutes} = require("./videoPage")


const router = require("express").Router();

router.use("/events" ,EventPageApiRoutes)
router.use("/videos" ,VideoPageApiRoutes)

module.exports = {
    PageRoutes : router
}