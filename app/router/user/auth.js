const { UserAuthContoller } = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth section
 */
/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          summary: login user in userpanel with phone number
 *          tags: [User-Authentication]
 *          description: one time password(OTP) login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/get-otp", UserAuthContoller.getOtp)
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          summary: check-otp value in user controller
 *          tags: [User-Authentication]
 *          description: check otp with code-mobile and expires date
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phone number
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: SMS code received
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */
router.post("/check-otp", UserAuthContoller.checkOtp)
/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          summary: Send refresh token 
 *          tags: [User-Authentication]
 *          description: Send refresh token to receive new token and refresh token
 *          parameters:
 *          -   in : body
 *              required : true
 *              type : string
 *              name : refreshToken
 *          responses:
 *              200:
 *                  description: Success
 */
router.post("/refresh-token",UserAuthContoller.refreshToken)
module.exports = {
    UserAuthRoutes : router
}