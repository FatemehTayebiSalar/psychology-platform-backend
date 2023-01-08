const { AdminPodcastController } = require("../../http/controllers/admin/podcast.controller");

const router = require("express").Router();


router.get("/" , AdminPodcastController.getListOfPodcasts)
router.get("/:id", AdminPodcastController.getPodcastById);


module.exports = {
    PodcastPageApiRoutes : router
}