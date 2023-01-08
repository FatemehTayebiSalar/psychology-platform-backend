const { UserAuthContoller } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();


router.post("/get-otp", UserAuthContoller.getOtp)
router.post("/check-otp", UserAuthContoller.checkOtp)
router.post("/refresh-token",UserAuthContoller.refreshToken)




module.exports = {
    UserAuthRoutes : router
}