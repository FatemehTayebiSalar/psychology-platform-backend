const { checkRole, veifyAccessToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { PageRoutes } = require("./api/pages.routes");
const { UserAuthRoutes } = require("./user/auth");
const router = require("express").Router();
router.use("/user",UserAuthRoutes)
router.use("/admin" ,veifyAccessToken, AdminRoutes)
router.use("/" ,veifyAccessToken,PageRoutes)
module.exports = {
    AllRoutes : router
}