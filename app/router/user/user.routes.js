const { checkPermission } = require("../../http/middlewares/permission.guard");
const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { PERMISSIONS } = require("../../utils/constants");
const { UserApplyRoutes } = require("./apply");
const { UserAuthRoutes } = require("./auth");

const router = require("express").Router();

router.use("/auth",UserAuthRoutes)
router.use("/apply",veifyAccessToken,checkPermission([PERMISSIONS.USER]),UserApplyRoutes)

module.exports = {
    UserRoutes : router
}