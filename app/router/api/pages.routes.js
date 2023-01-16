const { checkPermission } = require("../../http/middlewares/permission.guard");
const { EventPageApiRoutes } = require("./eventPage");
const { PodcastPageApiRoutes } = require("./podcastPage");
const { PsychologistPageApiRoutes } = require("./psychologistPage");
const { VideoPageApiRoutes } = require("./videoPage")


const router = require("express").Router();

router.use("/psychologists" ,PsychologistPageApiRoutes)
router.use("/events" ,EventPageApiRoutes)
router.use("/videos" ,VideoPageApiRoutes)
router.use("/podcasts",PodcastPageApiRoutes)

module.exports = {
    PageRoutes : router
}