const { AdminPermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = require("express").Router();


/**
 * @swagger
 *  components:
 *      schemas:
 *          AddPermission:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of permission
 *                  description:
 *                      type: string
 *                      description: The description of permission
 *          EditPermission:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: The title of permission
 *                  description:
 *                      type: string
 *                      description: The description of permission
 */

/** 
* @swagger
*   /admin/permission/add:
*       post:
*           tags : [RBAC(AdminPanel)]
*           summary : add permission
*           requestBody:
*               required: true
*               content:
*                   application/x-www-form-urlencoded:
*                       schema:
*                           $ref: '#/components/schemas/AddPermission'
*           responses:
*               201:
*                   description: added 
*              
*/

router.post("/add" , AdminPermissionController.createNewPermission)

/**
 * @swagger
 *  /admin/permission:
 *      get:
 *          tags : [RBAC(AdminPanel)]
 *          summary : get all permissions
 *          responses:
 *              200:
 *                  description: success - get arrey of permissions
 *              
 */

router.get("/" , AdminPermissionController.getListOfPermissions)

/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags : [RBAC(AdminPanel)]
 *          summary : update permission by ID
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
 *                           $ref: '#/components/schemas/EditPermission'
 *          responses:
 *              200:
 *                  description: updated
 *              
 */



/**
 * @swagger
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags : [RBAC(AdminPanel)]
 *          summary: remove permission by ID
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

module.exports = {
    PermissionAdminApiRoutes : router
}