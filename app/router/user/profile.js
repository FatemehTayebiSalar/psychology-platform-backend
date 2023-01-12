const { UserProfileContoller } = require("../../http/controllers/user/profile.controller");

const router = require("express").Router();



router.get("/" , UserProfileContoller.getProfile)
router.patch("/update" , UserProfileContoller.updateUserProfile)



module.exports = {
    UserProfileRoutes : router
}