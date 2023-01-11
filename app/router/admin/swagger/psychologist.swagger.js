/**
 * @swagger
 *  components:
 *      schemas:
 *          AddPsychologist:
 *              type: object
 *              required:
 *                  -   userID
 *                  -   name
 *                  -   degree
 *                  -   city
 *                  -   address
 *                  -   phoneNumber
 *                  -   visitAmount
 *                  -   profileImage
 *              properties:
 *                  userID:
 *                      type: string
 *                      description: The userID of user
 *                  name:
 *                      type: string
 *                      description: The name of psychologist
 *                  degree:
 *                      type: string
 *                      description: The degree of psychologist
 *                  city:
 *                      type: string
 *                      description: The city of psychologist
 *                  address:
 *                      type: string
 *                      description: Address of psychologist
 *                  phoneNumber:
 *                      type: string
 *                      description: The phoneNumber of psychologist
 *                  visitAmount:
 *                      type: string
 *                      description: The visit amount of psychologist
 *                  profileImage:
 *                      type: file
 *                      description: The profile image of psychologist
 *          EditPsychologist:
 *              type: object
 *              properties:
 *                  userID:
 *                      type: string
 *                      description: The userID of user
 *                  name:
 *                      type: string
 *                      description: The edirted name of psychologist
 *                  degree:
 *                      type: string
 *                      description: The edirted degree of psychologist
 *                  city:
 *                      type: string
 *                      description: The edirted city of psychologist
 *                  address:
 *                      type: string
 *                      description: edirted Address of psychologist
 *                  phoneNumber:
 *                      type: string
 *                      description: The edirted phoneNumber of psychologist
 *                  visitAmount:
 *                      type: string
 *                      description: The edirted visit amount of psychologist
 *                  profileImage:
 *                      type: file
 *                      description: The edirted profile image of psychologist    
 */

/** 
* @swagger
*   /admin/psychologist/add:
*       post:
*           tags : [Psychologists(AdminPanel)]
*           summary : add psychologist
*           requestBody:
*               required: true
*               content:
*                   multipart/form-data:
*                       schema:
*                           $ref: '#/components/schemas/AddPsychologist'
*           responses:
*               201:
*                   description: added 
*              
*/

/**
 * @swagger
 *  /admin/psychologist:
 *      get:
 *          tags : [Psychologists(AdminPanel)]
 *          summary : get all psychologists
 *          parameters :
 *              -   in: query
 *                  name : search
 *                  type : text
 *                  description : search in psychologist name, degree, city
 *          responses:
 *              200:
 *                  description: success - get arrey of psychologists
 *              
 */

/**
 * @swagger
 *  /admin/psychologist/{id}:
 *      get:
 *          tags : [Psychologists(AdminPanel)]
 *          summary: get psychologist by ID 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description : ObjectId of psychologist
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/psychologist/update/{id}:
 *      patch:
 *          tags : [Psychologists(AdminPanel)]
 *          summary : update psychologist by ID
 *          parameters:
 *              -   in: path
 *                  name: id    
 *                  required : true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditPsychologist'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */

/**
 * @swagger
 *  /admin/psychologist/remove/{id}:
 *      delete:
 *          tags : [Psychologists(AdminPanel)]
 *          summary: remove psychologist by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

