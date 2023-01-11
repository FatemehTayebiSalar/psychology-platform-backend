/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateApplication:
 *              type: object
 *              required:
 *                  -   response
 *              properties:
 *                  response:
 *                      type: string
 *                      description: response for application
 *                      enum :
 *                          -   Accepted
 *                          -   Rejected
 */


/**
 * @swagger
 *  /admin/application:
 *      get:
 *          tags : [Application(AdminPanel)]
 *          summary : get all applications
 *          parameters :
 *              -   in: query
 *                  name : search
 *                  type : text
 *                  description : search in application's response , name , degree
 *          responses:
 *              200:
 *                  description: success - get arrey of applications
 *              
 */

/**
 * @swagger
 *  /admin/application/{applicationID}:
 *      get:
 *          tags : [Application(AdminPanel)]
 *          summary: get application by ID 
 *          parameters:
 *              -   in: path
 *                  name: applicationID
 *                  type: string
 *                  description : ObjectId of appliction
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/application/update/{applicationID}:
 *      patch:
 *          tags : [Application(AdminPanel)]
 *          summary : examination applications
 *          parameters:
 *              -   in: path
 *                  name: applicationID    
 *                  required : true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateApplication'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */
