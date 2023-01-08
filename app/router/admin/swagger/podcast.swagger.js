/**
 * @swagger
 *  components:
 *      schemas:
 *          AddPodcast:
 *              type: object
 *              required:
 *                  -   title
 *                  -   coverImage
 *                  -   information
 *                  -   narrator
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of podcast
 *                  coverImage:
 *                      type: file
 *                      description: The cover image of podcast
 *                  information:
 *                      type: string
 *                      description: The information of podcast
 *                  narrator:
 *                      type: string
 *                      description: Narrator of podcast
 *                  price:
 *                      type: string
 *                      description: The price of podcast
 *          EditPodcast:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The edited title of podcast
 *                  coverImage:
 *                      type: file
 *                      description: The edited cover image of podcast
 *                  information:
 *                      type: string
 *                      description: The edited information of podcast
 *                  narrator:
 *                      type: string
 *                      description: Narrator of podcast
 *                  price:
 *                      type: string
 *                      description: The price of podcast
 */

/**
 * @swagger
 *  /admin/podcast/add:
 *      post:
 *          tags : [Podcast(AdminPanel)]
 *          summary : add podcast
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddPodcast'
 *          responses:
 *              201:
 *                  description: added 
 *              
 */
 
/**
 * @swagger
 *  /admin/podcast:
 *      get:
 *          tags : [Podcast(AdminPanel)]
 *          summary : get all podcasts
 *          parameters :
 *              -   in: query
 *                  name : search
 *                  type : text
 *                  description : search in podcast title, information, narrator
 *          responses:
 *              200:
 *                  description: success - get arrey of podcasts 
 *              
 */

/**
 * @swagger
 *  /admin/podcast/{id}:
 *      get:
 *          tags : [Podcast(AdminPanel)]
 *          summary: get podcast by ID and populate this field
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /admin/podcast/update/{id}:
 *      patch:
 *          tags : [Podcast(AdminPanel)]
 *          summary : update podcast by ID
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
 *                          $ref: '#/components/schemas/EditPodcast'
 *          responses:
 *              201:
 *                  description: updated
 *              
 */

/**
 * @swagger
 *  /admin/podcast/{id}:
 *      delete:
 *          tags : [Podcast(AdminPanel)]
 *          summary: remove podcast by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */