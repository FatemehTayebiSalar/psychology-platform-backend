const { AdminVideoController } = require("../../http/controllers/admin/video.controller");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();


router.post("/add", uploadFile.single("coverImage") , AdminVideoController.addVideo)
router.get("/" , AdminVideoController.getListOfVideos)
router.get("/:id", AdminVideoController.getVideoById);
router.patch("/update/:id",uploadFile.single("coverImage"), AdminVideoController.updateVideoById)
router.delete("/remove/:id", AdminVideoController.deleteVideoById);


module.exports = {
    VideoAdminApiRoutes : router
}