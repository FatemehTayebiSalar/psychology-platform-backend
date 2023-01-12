const { EventsPageController } = require("../../http/controllers/api/eventsPage.controller");
const { PERMISSIONS } = require("../../utils/constants");
const { checkPermission } = require("../../http/middlewares/permission.guard");

const router = require("express").Router();


router.get("/" , EventsPageController.getListOfEvents)
router.get("/:id" , EventsPageController.getEventById)
router.patch("/getTicket/:eventID" ,checkPermission([PERMISSIONS.USER]), EventsPageController.getTicket)



module.exports = {
    EventPageApiRoutes : router
}