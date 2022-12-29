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
 *  /admin/episode/remove/{episodeID}:
 *      delete:
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

router.delete("/remove/:episodeID", AdminEpisodeController.removeEpisode );

module.exports = { 
    EpisodeAdminApiRoutes : router
}