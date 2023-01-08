/**
 * @swagger
 *  /podcasts:
 *      get:
 *          tags : [PodcastsPage]
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
 *  /podcasts/{id}:
 *      get:
 *          tags : [PodcastsPage]
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
