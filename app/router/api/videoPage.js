const { AdminEpisodeController } = require("../../http/controllers/admin/episode.controller");
const { AdminVideoController } = require("../../http/controllers/admin/video.controller");


const router = require("express").Router();


router.get("/" , AdminVideoController.getListOfVideos)
router.get("/:id", AdminVideoController.getVideoById);



module.exports = {
    VideoPageApiRoutes : router
}