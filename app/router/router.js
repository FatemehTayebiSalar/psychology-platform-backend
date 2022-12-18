const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");
const router = require("express").Router();
router.use("/user",UserAuthRoutes)
router.use("/admin" , AdminRoutes)
router.use("/",HomeRoutes)
module.exports = {
    AllRoutes : router
}