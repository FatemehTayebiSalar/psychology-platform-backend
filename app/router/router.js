const { checkRole, veifyAccessToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { PageRoutes } = require("./api/pages.routes");
const { UserRoutes } = require("./user/user.routes");
const router = require("express").Router();
router.use("/user",UserRoutes)
router.use("/admin" ,veifyAccessToken, AdminRoutes)
router.use("/" ,PageRoutes)
module.exports = {
    AllRoutes : router
}