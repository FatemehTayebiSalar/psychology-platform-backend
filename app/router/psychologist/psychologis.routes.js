const { PsychologistScheduleApiRoutes } = require("./schedule");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constants");
const router = require("express").Router();

// router.use("/profile" , veifyAccessToken , checkPermission([PERMISSIONS.USER]),UserProfileRoutes)
router.use("/schedule",checkPermission([PERMISSIONS.PSYCHOLOGIST]),PsychologistScheduleApiRoutes)

module.exports = {
    PsychologistRoutes : router
}