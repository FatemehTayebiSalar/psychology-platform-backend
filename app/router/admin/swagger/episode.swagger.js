/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *              type: object
 *              required:
 *                  -   mainFileID
 *                  -   chapterID
 *                  -   title
 *                  -   text
 *                  -   type
 *                  -   file
 *              properties:
 *                  mainFileID:
 *                      type: string
 *                      description: The ID of video or podcast
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
 *                  file:
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
 *                  file:
 *                      type: string
 *                      description: The edited file of video or podcast
 *                      format: binary
 */

/**
 * @swagger
 *  /admin/episode/add/{modelName}:
 *      post:
 *          tags : [Episode(AdminPanel)]
 *          summary : add episode
 *          parameters:
 *              -   in: path
 *                  name: modelName    
 *                  required : true
 *                  type: string
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
 
/**
 * @swagger
 *  /admin/episode/update/{modelName}/{episodeID}:
 *      patch:
 *          tags : [Episode(AdminPanel)]
 *          summary : update episode of chapter by ID
 *          parameters:
 *              -   in: path
 *                  name: modelName    
 *                  required : true
 *                  type: string
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

/**
 * @swagger
 *  /admin/episode/remove/{modelName}/{episodeID}:
 *      patch:
 *          tags : [Episode(AdminPanel)]
 *          summary: remove episode by ID
 *          parameters:
 *              -   in: path
 *                  name: modelName    
 *                  required : true
 *                  type: string
 *              -   in: path
 *                  name: episodeID    
 *                  required : true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success
 */