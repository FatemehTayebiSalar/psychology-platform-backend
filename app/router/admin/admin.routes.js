const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { ChapterAdminApiRoutes } = require("./chapter");
const { EpisodeAdminApiRoutes } = require("./episode");
const { EventAdminApiRoutes } = require("./event");
const { PodcastAdminApiRoutes } = require("./podcast");
const { VideoAdminApiRoutes } = require("./video");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -   name : Admin-Panel
 *          description : action of admin(add,delete,edit and do anything )
 *      -   name : Podcast(AdminPanel)
 *          description : action of admin about podcast section(add,delete,edit and do anything )
 *      -   name : Video(AdminPanel)
 *          description : action of admin about video section(add,delete,edit and do anything )
 *      -   name : Event(AdminPanel)
 *          description : action of admin about event section(add,delete,edit and do anything )
 *      -   name : Chapter(AdminPanel)
 *          description : action of admin about chapters(add,delete,edit and do anything )
 *      -   name : Episode(AdminPanel)
 *          description : action of admin about episodes(add,delete,edit and do anything )
 */
router.use("/podcast" ,PodcastAdminApiRoutes)
router.use("/video" ,VideoAdminApiRoutes)
router.use("/event" ,EventAdminApiRoutes)
router.use("/chapter" , ChapterAdminApiRoutes)
router.use("/episode" , EpisodeAdminApiRoutes)
module.exports = {
    AdminRoutes : router
}