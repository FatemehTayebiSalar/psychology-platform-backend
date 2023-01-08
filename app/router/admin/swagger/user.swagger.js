/**
 * @swagger
 *  /admin/user:
 *      get:
 *          tags : [Users(AdminPanel)]
 *          summary : get all users
 *          parameters :
 *              -   in: query
 *                  name : search
 *                  type : text
 *                  description : search in user email , first name, last name, mobile
 *          responses:
 *              200:
 *                  description: success - get arrey of users
 *              
 */