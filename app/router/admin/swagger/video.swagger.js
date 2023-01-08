/**
 * @swagger
 *  components:
 *      schemas:
 *          AddVideo:
 *              type: object
 *              required:
 *                  -   title
 *                  -   coverImage
 *                  -   information
 *                  -   coach
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of video
 *                  coverImage:
 *                      type: file
 *                      description: The cover image of video
 *                  information:
 *                      type: string
 *                      description: The information of video
 *                  coach:
 *                      type: string
 *                      description: Coach of video
 *                  price:
 *                      type: string
 *                      description: The price of video
 *          EditVideo:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The edited title of video
 *                  coverImage:
 *                      type: file
 *                      description: The edited cover image of video
 *                  information:
 *                      type: string
 *                      description: The edited information of video
 *                  coach:
 *                      type: string
 *                      description: The edited Coach of video
 *                  price:
 *                      type: string
 *                      description: The edited price of video
 */

/**
 * @swagger
 *  /admin/video/add:
 *      post:
 *          tags : [Video(AdminPanel)]
 *          summary : add video
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddVideo'
 *          responses:
 *              201:
 *                  description: added 
 *              
 */
 
/**
 * @swagger
 *  /admin/video:
 *      get:
 *          tags : [Video(AdminPanel)]
 *          summary : get all videos
 *          parameters:
 *              -   in: query
 *                  name : search
 *                  type : string
 *                  description: text for serch in title,information,coach of (video)
 *          responses:
 *              200:
 *                  description: success - get arrey of videos 
 *              
 */

/**
 * @swagger
 *  /admin/video/{id}:
 *      get:
 *          tags : [Video(AdminPanel)]
 *          summary: get video by ID 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description : ObjectId of video
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/video/update/{id}:
 *      patch:
 *          tags : [Video(AdminPanel)]
 *          summary : update video by ID
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
 *                          $ref: '#/components/schemas/EditVideo'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */

/**
 * @swagger
 *  /admin/video/remove/{id}:
 *      delete:
 *          tags : [Video(AdminPanel)]
 *          summary: remove video by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */
