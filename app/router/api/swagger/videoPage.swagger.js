/**
 * @swagger
 *  /videos:
 *      get:
 *          tags : [VideosPage]
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
 *  /videos/{id}:
 *      get:
 *          tags : [VideosPage]
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