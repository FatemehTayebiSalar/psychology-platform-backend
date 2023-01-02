const { AdminEpisodeController } = require("../../http/controllers/admin/episode.controller");
const { uploadVideo } = require("../../utils/multer");

const router = require ("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   videoID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   video
 *              properties:
 *                  videoID:
 *                      type: string
 *                      description: The ID of video
 *                  chapterID:
 *                      type: string
 *                      description: The ID of chapter
 *                  title:
 *                      type: string
 *                      description: The title of episode
 *                  text:
 *                      type: string
 *                      description: The text of episode
 *                  type:
 *                      type: string
 *                      description: The type of episode(Lock or Unlock)
 *                      enum :
 *                          -   Unlock
 *                          -   Lock
 *                  video:
 *                      type: string
 *                      description: The file of video
 *                      format: binary
 *          EditEpisode:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The edited title of episode
 *                  text:
 *                      type: string
 *                      description: The edited text of episode
 *                  type:
 *                      type: string
 *                      description: The edited type of episode(Lock or Unlock)
 *                      enum :
 *                          -   Unlock
 *                          -   Lock
 *                  video:
 *                      type: string
 *                      description: The edited file of video
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags : [Episode(AdminPanel)]
 *          summary : add episode
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                  description: added 
 *              
 */
 
router.post("/add" ,uploadVideo.single("video") , AdminEpisodeController.addEpisode)


/**
 * @swagger
 *  /admin/episode/update/{episodeID}:
 *      patch:
 *          tags : [Episode(AdminPanel)]
 *          summary : update episode of chapter by ID
 *          parameters:
 *              -   in: path
 *                  name: episodeID    
 *                  required : true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/EditEpisode'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */

 router.patch("/update/:episodeID",uploadVideo.single("video"), AdminEpisodeController.updateEpisodeById)


/**
 * @swagger
 *  /admin/episode/remove/{episodeID}:
 *      patch:
 *          tags : [Episode(AdminPanel)]
 *          summary: remove episode by ID
 *          parameters:
 *              -   in: path
 *                  name: episodeID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

router.patch("/remove/:episodeID", AdminEpisodeController.removeEpisode );

module.exports = { 
    EpisodeAdminApiRoutes : router
}