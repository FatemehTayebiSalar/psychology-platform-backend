/**
 * @swagger
 *  /events:
 *      get:
 *          tags : [EventsPage]
 *          summary : get list of events 
 *          parameters :
 *              -   in: query
 *                  name : search
 *                  type : text
 *                  description : search in event title, information, organizer
 *          responses:
 *              200:
 *                  description: success - get arrey of events
 *              
 */

/**
 * @swagger
 *  /events/{id}:
 *      get:
 *          tags : [EventsPage]
 *          summary: get event by ID 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description : ObjectId of event
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */