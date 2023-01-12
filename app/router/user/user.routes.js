const { checkPermission } = require("../../http/middlewares/permission.guard");
const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { PERMISSIONS } = require("../../utils/constants");
const { UserApplyRoutes } = require("./apply");
const { UserAuthRoutes } = require("./auth");
const { UserProfileRoutes } = require("./profile");

const router = require("express").Router();

router.use("/auth",UserAuthRoutes)
router.use("/profile" , veifyAccessToken , checkPermission([PERMISSIONS.USER]),UserProfileRoutes)
router.use("/apply",veifyAccessToken,checkPermission([PERMISSIONS.USER]),UserApplyRoutes)

module.exports = {
    UserRoutes : router
}