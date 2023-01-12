/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProfile:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: First name of user
 *                  lastName:
 *                      type: string
 *                      description: Last name of user
 *                  email:
 *                      type: string
 *                      description: Email address of user
 */

/**
 * @swagger
 *  /user/profile:
 *      get:
 *          tags : [Profile(UserPanel)]
 *          summary : get profile
 *          responses:
 *              200:
 *                  description: success 
 *              
 */

/**
 * @swagger
 *  /user/profile/update:
 *      patch:
 *          tags : [Profile(UserPanel)]
 *          summary : update profile of user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateProfile'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */

