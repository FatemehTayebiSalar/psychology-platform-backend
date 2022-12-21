const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
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
 */
router.use("/podcast" ,PodcastAdminApiRoutes)
router.use("/video" ,VideoAdminApiRoutes)
module.exports = {
    AdminRoutes : router
}