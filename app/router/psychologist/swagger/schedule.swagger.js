/**
 * @swagger
 *  tags:
 *      -   name : Psychologist-Panel
 *          description : action of psychologist
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddSchedule:
 *              type: object
 *              required:
 *                  -   date
 *                  -   startHour
 *                  -   startMinute
 *                  -   endHour
 *                  -   endMinute
 *              properties:
 *                  date:
 *                      type: string
 *                      description: date of schedule
 *                  repeatIndex:
 *                      type: string
 *                      description: repeat of schedule
 *                      enum :
 *                          -   بدون تکرار
 *                          -   هر روز
 *                          -   هر هفته   
 *                  startHour:
 *                      type: string
 *                      description: Time to start work(Hour)
 *                  startMinute:
 *                      type: string
 *                      description: Time to start work(Minute)
 *                      enum :
 *                          -   00
 *                          -   15
 *                          -   30
 *                          -   45
 *                  endHour:
 *                      type: string
 *                      description: End of work time(Hour)
 *                  endMinute:
 *                      type: string
 *                      description: End of work time(Minute)
 *                      enum :
 *                          -   00
 *                          -   15
 *                          -   30
 *                          -   45
 * 
 *          EditEvent:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The edited title of event
 *                  information:
 *                      type: string
 *                      description: The edited information of event
 *                  organizer:
 *                      type: string
 *                      description: The edited organizer of event
 *                  date:
 *                      type: string
 *                      format: date
 *                      description: The edited date of event
 *                  address:
 *                      type: string
 *                      description: The edited address of event
 *                  price:
 *                      type: string
 *                      description: The edited price of event
 *                  capacity:
 *                      type: string
 *                      description: The edited capacity of event
 *                  coverImage:
 *                      type: file
 *                      description: The edited cover image of event
 */

/** 
* @swagger
*   /psychologist/schedule/add:
*       patch:
*           tags : [Psychologist-Panel]
*           summary : add schedule
*           requestBody:
*               required: true
*               content:
*                   application/x-www-form-urlencoded:
*                       schema:
*                           $ref: '#/components/schemas/AddSchedule'
*           responses:
*               201:
*                   description: added 
*              
*/

/**
 * @swagger
 *  /psychologist/schedule:
 *      get:
 *          tags : [Psychologist-Panel]
 *          summary : get schedules
 *          responses:
 *              200:
 *                  description: success - get arrey of schedules
 *              
 */

/**
 * @swagger
 *  /psychologist/schedule/remove/{scheduleID}:
 *      patch:
 *          tags: [Psychologist-Panel]
 *          summary: delete timeSlot of schedules by id
 *          parameters:
 *              -   in: path
 *                  name: scheduleID
 *                  type: string
 *                  required: true    
 *          responses:
 *              200:
 *                  description: success                
 */