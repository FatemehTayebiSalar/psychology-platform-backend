const { checkRole, veifyAccessToken } = require("../http/middlewares/verifyAccessToken");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const router = require("express").Router();
router.use("/user",UserAuthRoutes)
router.use("/admin" ,veifyAccessToken, AdminRoutes)
router.use("/",HomeRoutes)
module.exports = {
    AllRoutes : router
}