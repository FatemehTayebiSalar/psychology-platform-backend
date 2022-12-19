const { AdminPodcastController } = require("../../http/controllers/admin/podcast.controller");
const {uploadFile} = require("../../utils/multer")


const router = require("express").Router();

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
 */

/**
 * @swagger
 *  /admin/podcast:
 *      get:
 *          tags : [Podcast(AdminPanel)]
 *          summary : get all podcasts
 *          responses:
 *              200:
 *                  description: success - get arrey of podcasts 
 *              
 */

router.get("/" , AdminPodcastController.getListOfPodcasts)

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
 
router.post("/add",uploadFile.single("coverImage"), AdminPodcastController.addPodcast)

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

router.get("/:id", AdminPodcastController.getPodcastById);

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

router.delete("/:id", AdminPodcastController.deletePodcastById);

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

router.patch("/update/:id",uploadFile.single("coverImage"), AdminPodcastController.updatePodcastById)

module.exports = {
    PodcastAdminApiRoutes : router
}