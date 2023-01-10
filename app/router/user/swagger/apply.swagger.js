/**
 * @swagger
 *  components:
 *      schemas:
 *          AddApplication:
 *              type: object
 *              required:
 *                  -   name
 *                  -   degree
 *                  -   city
 *                  -   address
 *                  -   phoneNumber
 *                  -   visitAmount
 *                  -   files
 *              properties:
 *                  name:
 *                      type: string
 *                      description: The name of applicant
 *                  degree:
 *                      type: string
 *                      description: The degree of applicant
 *                  city:
 *                      type: string
 *                      description: The city where the applicant is working
 *                  address:
 *                      type: string
 *                      description: The address where the applicant is working
 *                  phoneNumber:
 *                      type: string
 *                      description: The phoneNumber of applicant
 *                  visitAmount:
 *                      type: string
 *                      description: The visit amount of applicant
 *                  files:
 *                      type: array
 *                      description: 3 image files for validation[applicant's academic degree(first),applicant's CV(second),applicant's image(third)]
 *                      items:
 *                          type: string
 *                          format: binary 
 */

/** 
* @swagger
*   /user/apply/add:
*       post:
*           tags : [Apply(UserPanel)]
*           summary : add application
*           requestBody:
*               required: true
*               content:
*                   multipart/form-data:
*                       schema:
*                           $ref: '#/components/schemas/AddApplication'
*           responses:
*               201:
*                   description: added 
*              
*/