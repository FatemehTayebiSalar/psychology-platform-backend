/**
 * @swagger
 *  components:
 *      schemas:
 *          AddRole:
 *              type: object
 *              required:
 *                  -   title
 *                  -   description
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of role
 *                  description:
 *                      type: string
 *                      description: The description of role
 *                  permissions:
 *                      type : array
 *                      description : The permission ID for role
 *          EditRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of role
 *                  description:
 *                      type: string
 *                      description: The description of role
 *                  permissions:
 *                      type : array
 *                      description : The permission ID for role
 */

/** 
* @swagger
*   /admin/role/add:
*       post:
*           tags : [RBAC(AdminPanel)]
*           summary : add role
*           requestBody:
*               required: true
*               content:
*                   application/x-www-form-urlencoded:
*                       schema:
*                           $ref: '#/components/schemas/AddRole'
*           responses:
*               201:
*                   description: added 
*              
*/

/**
 * @swagger
 *  /admin/role:
 *      get:
 *          tags : [RBAC(AdminPanel)]
 *          summary : get all roles
 *          responses:
 *              200:
 *                  description: success - get arrey of roles
 *              
 */

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags : [RBAC(AdminPanel)]
 *          summary : update role by ID
 *          parameters:
 *              -   in: path
 *                  name: id    
 *                  required : true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                   application/x-www-form-urlencoded:
 *                       schema:
 *                           $ref: '#/components/schemas/EditRole'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */

/**
 * @swagger
 *  /admin/role/remove/{field}:
 *      delete:
 *          tags : [RBAC(AdminPanel)]
 *          summary: remove role by ID
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

