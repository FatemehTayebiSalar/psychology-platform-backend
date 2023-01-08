const { EventsPageController } = require("../../http/controllers/api/eventsPage.controller");

const router = require("express").Router();


router.get("/" , EventsPageController.getListOfEvents)
router.get("/:id" , EventsPageController.getEventById)



module.exports = {
    EventPageApiRoutes : router
}