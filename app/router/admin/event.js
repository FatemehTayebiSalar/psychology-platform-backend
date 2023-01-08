const { AdminEventController } = require("../../http/controllers/admin/event.controller");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();


router.post("/add" , uploadFile.single("coverImage") ,AdminEventController.addEvent)
router.get("/" , AdminEventController.getListOfEvents)
router.get("/:id", AdminEventController.getEventById);
router.patch("/update/:id",uploadFile.single("coverImage"), AdminEventController.updateEventById)
router.delete("/remove/:id", AdminEventController.deleteEventById);


module.exports = {
    EventAdminApiRoutes : router
}