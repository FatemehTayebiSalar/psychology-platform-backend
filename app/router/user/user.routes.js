const { UserAuthRoutes } = require("./auth");

const router = require("express").Router();

router.use("/auth",UserAuthRoutes)

module.exports = {
    UserRoutes : router
}