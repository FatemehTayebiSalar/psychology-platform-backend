const { AdminPodcastController } = require("../../http/controllers/admin/podcast.controller");
const {uploadFile} = require("../../utils/multer")


const router = require("express").Router();
/**
 * @swagger
 *  /admin/podcast:
 *      get:
 *          tags : [Podcast(AdminPanel)]
 *          summary : get all podcasts
 *          parameters:
 *              -   in: header
 *                  example : Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwNzY3MTA0NyIsImlhdCI6MTY3MTM3MjU5NywiZXhwIjoxNjcxMzc5Nzk3fQ.6xeVLx53k3-1qs3eAJ2dgDFlP4eigbn4AOAZ7O0iCKg
 *                  name: access-token
 *                  type: string
 *                  required: true
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
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example : Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwNzY3MTA0NyIsImlhdCI6MTY3MTM3MjU5NywiZXhwIjoxNjcxMzc5Nzk3fQ.6xeVLx53k3-1qs3eAJ2dgDFlP4eigbn4AOAZ7O0iCKg
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: formData
 *                  name: title
 *                  required: true
 *                  type: string
 *              -   in: formData
 *                  name: coverImage
 *                  required: true
 *                  type: file
 *              -   in: formData
 *                  name: information
 *                  required: true
 *                  type: string
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
 *              -   in: header
 *                  example : Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwNzY3MTA0NyIsImlhdCI6MTY3MTM3MjU5NywiZXhwIjoxNjcxMzc5Nzk3fQ.6xeVLx53k3-1qs3eAJ2dgDFlP4eigbn4AOAZ7O0iCKg
 *                  name: access-token
 *                  type: string
 *                  required: true
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
 *              -   in: header
 *                  example : Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwNzY3MTA0NyIsImlhdCI6MTY3MTM3MjU5NywiZXhwIjoxNjcxMzc5Nzk3fQ.6xeVLx53k3-1qs3eAJ2dgDFlP4eigbn4AOAZ7O0iCKg
 *                  name: access-token
 *                  type: string
 *                  required: true
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
 *          consumes:
 *              - multipart/form-data
 *          parameters:
 *              -   in: header
 *                  example : Bearer token...
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEwNzY3MTA0NyIsImlhdCI6MTY3MTM3MjU5NywiZXhwIjoxNjcxMzc5Nzk3fQ.6xeVLx53k3-1qs3eAJ2dgDFlP4eigbn4AOAZ7O0iCKg
 *                  name: access-token
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: id
 *                  required : true
 *                  type: string
 *              -   in: formData
 *                  name: title
 *                  type: string
 *              -   in: formData
 *                  name: coverImage
 *                  type: file
 *              -   in: formData
 *                  name: information
 *                  type: string
 *          responses:
 *              201:
 *                  description: updated
 *              
 */
router.patch("/update/:id",uploadFile.single("coverImage"), AdminPodcastController.updatePodcastById)
module.exports = {
    PodcastAdminApiRoutes : router
}