/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: The user mobile for sign-in/sign-up
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: The user mobile for sign-in/sign-up
 *                  code:
 *                      type: integer
 *                      description: Received code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: Enter refresh-token for getting new fresh token and refresh-token
 */


/**
 * @swagger
 *  /user/auth/get-otp:
 *      post:
 *          summary: login user in userpanel with phone number
 *          tags: [Authentication(UserPanel)]
 *          description: one time password(OTP) login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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

/**
 * @swagger
 *  /user/auth/check-otp:
 *      post:
 *          summary: check-otp value in user controller
 *          tags: [Authentication(UserPanel)]
 *          description: check otp with code-mobile and expires date
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
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

/**
 * @swagger
 *  /user/auth/refresh-token:
 *      post:
 *          summary: Send refresh token 
 *          tags: [Authentication(UserPanel)]
 *          description: Send refresh token to receive new token and refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: Success
 */
