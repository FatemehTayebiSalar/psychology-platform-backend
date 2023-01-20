const { AdminEventController } = require("../../http/controllers/admin/event.controller");
const {uploadPicture} = require("../../utils/multer")
const router = require("express").Router();


router.post("/add" , uploadPicture.single("coverImage") ,AdminEventController.addEvent)
router.get("/" , AdminEventController.getListOfEvents)
router.get("/:id", AdminEventController.getEventById);
router.patch("/update/:id", uploadPicture.single("coverImage"), AdminEventController.updateEventById)
router.delete("/remove/:id", AdminEventController.deleteEventById);


module.exports = {
    EventAdminApiRoutes : router
}