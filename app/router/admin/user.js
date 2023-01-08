const { AdminUserController } = require("../../http/controllers/admin/user.controller");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constants");

const router = require("express").Router();

// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          AddEvent:
//  *              type: object
//  *              required:
//  *                  -   title
//  *                  -   information
//  *                  -   organizer
//  *                  -   date
//  *                  -   address
//  *                  -   price
//  *                  -   capacity
//  *                  -   coverImage
//  *              properties:
//  *                  title:
//  *                      type: string
//  *                      description: The title of event
//  *                  information:
//  *                      type: string
//  *                      description: The information of event
//  *                  organizer:
//  *                      type: string
//  *                      description: Organizer of event
//  *                  date:
//  *                      type: string
//  *                      format: date
//  *                      description: Date of event
//  *                  address:
//  *                      type: string
//  *                      description: Address of event
//  *                  price:
//  *                      type: string
//  *                      description: The price of event
//  *                  capacity:
//  *                      type: string
//  *                      description: The capacity of event
//  *                  coverImage:
//  *                      type: file
//  *                      description: The cover image of event
//  *          EditEvent:
//  *              type: object
//  *              properties:
//  *                  title:
//  *                      type: string
//  *                      description: The edited title of event
//  *                  information:
//  *                      type: string
//  *                      description: The edited information of event
//  *                  organizer:
//  *                      type: string
//  *                      description: The edited organizer of event
//  *                  date:
//  *                      type: string
//  *                      format: date
//  *                      description: The edited date of event
//  *                  address:
//  *                      type: string
//  *                      description: The edited address of event
//  *                  price:
//  *                      type: string
//  *                      description: The edited price of event
//  *                  capacity:
//  *                      type: string
//  *                      description: The edited capacity of event
//  *                  coverImage:
//  *                      type: file
//  *                      description: The edited cover image of event
//  */

// /** 
// * @swagger
// *   /admin/event/add:
// *       post:
// *           tags : [Event(AdminPanel)]
// *           summary : add event
// *           requestBody:
// *               required: true
// *               content:
// *                   multipart/form-data:
// *                       schema:
// *                           $ref: '#/components/schemas/AddEvent'
// *           responses:
// *               201:
// *                   description: added 
// *              
// */

// router.post("/add" , uploadFile.single("coverImage") ,AdminEventController.addEvent)

// /**
//  * @swagger
//  *  /admin/event/{id}:
//  *      get:
//  *          tags : [Event(AdminPanel)]
//  *          summary: get event by ID 
//  *          parameters:
//  *              -   in: path
//  *                  name: id
//  *                  type: string
//  *                  description : ObjectId of event
//  *                  required: true
//  *          responses:
//  *              200:
//  *                  description: success
//  */

// router.get("/:id", AdminEventController.getEventById);

// /**
//  * @swagger
//  *  /admin/event/update/{id}:
//  *      patch:
//  *          tags : [Event(AdminPanel)]
//  *          summary : update event by ID
//  *          parameters:
//  *              -   in: path
//  *                  name: id    
//  *                  required : true
//  *                  type: string
//  *          requestBody:
//  *              required: true
//  *              content:
//  *                  multipart/form-data:
//  *                      schema:
//  *                          $ref: '#/components/schemas/EditEvent'
//  *          responses:
//  *              200:
//  *                  description: updated
//  *              
//  */

// router.patch("/update/:id",uploadFile.single("coverImage"), AdminEventController.updateEventById)

// /**
//  * @swagger
//  *  /admin/event/remove/{id}:
//  *      delete:
//  *          tags : [Event(AdminPanel)]
//  *          summary: remove event by ID
//  *          parameters:
//  *              -   in: path
//  *                  name: id
//  *                  type: string
//  *                  required: true
//  *          responses:
//  *              200:
//  *                  description: success
//  */

// router.delete("/remove/:id", AdminEventController.deleteEventById);


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

router.get("/" ,checkPermission([PERMISSIONS.ADMIN]) ,AdminUserController.getAllUsers)
module.exports = {
    UserAdminApiRoutes : router
}