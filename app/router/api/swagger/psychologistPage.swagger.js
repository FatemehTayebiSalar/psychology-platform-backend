/**
 * @swagger
 *  /psychologists:
 *      get:
 *          tags : [PsychologistPage]
 *          summary : get all psychologists
 *          parameters:
 *              -   in: query
 *                  name : search
 *                  type : string
 *                  description: text for serch in name,city,degree
 *          responses:
 *              200:
 *                  description: success - get arrey of psychologists 
 *              
 */

/**
 * @swagger
 *  /psychologists/{id}:
 *      get:
 *          tags : [PsychologistPage]
 *          summary: get psychologist by ID 
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description : ObjectId of psychologist
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */