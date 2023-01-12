/**
 * @swagger
 *  components:
 *      schemas:
 *          GetTicket:
 *              type: object
 *              required:
 *                  -   firstName
 *                  -   lastName
 *                  -   mobile
 *              properties:
 *                  firstName:
 *                      type: string
 *                      description: firstName of participant
 *                  lastName:
 *                      type: string
 *                      description: lastName of participant
 *                  mobile:
 *                      type: string
 *                      description: mobile number of participant
 */


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

/** 
* @swagger
*   /events/getTicket/{eventID}:
*       patch:
*           tags : [EventsPage]
*           summary : get ticket
*           parameters:
*               -   in: path
*                   name: eventID
*                   type: string
*                   description : ObjectId of event
*                   required: true
*           requestBody:
*               required: true
*               content:
*                   multipart/form-data:
*                       schema:
*                           $ref: '#/components/schemas/GetTicket'
*           responses:
*               201:
*                   description: added 
*              
*/