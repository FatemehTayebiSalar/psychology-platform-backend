const { checkPermission } = require("../../http/middlewares/permission.guard");
const { EventPageApiRoutes } = require("./eventPage");
const { PodcastPageApiRoutes } = require("./podcastPage");
const { VideoPageApiRoutes } = require("./videoPage")


const router = require("express").Router();

router.use("/events" ,checkPermission([]),EventPageApiRoutes)
router.use("/videos" ,checkPermission([]),VideoPageApiRoutes)
router.use("/podcasts" ,checkPermission([]),PodcastPageApiRoutes)

module.exports = {
    PageRoutes : router
}