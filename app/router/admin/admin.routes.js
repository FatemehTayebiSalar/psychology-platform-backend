const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { ChapterAdminApiRoutes } = require("./chapter");
const { EpisodeAdminApiRoutes } = require("./episode");
const { EventAdminApiRoutes } = require("./event");
const { PermissionAdminApiRoutes } = require("./permission");
const { PodcastAdminApiRoutes } = require("./podcast");
const { RoleAdminApiRoutes } = require("./role");
const { UserAdminApiRoutes } = require("./user");
const { VideoAdminApiRoutes } = require("./video");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -   name : Admin-Panel
 *          description : action of admin(add,delete,edit and do anything )
 *      -   name : RBAC(AdminPanel)
 *          description : RoleBaseAccessControll System(create and manage role and permissions)
 *      -   name : Users(AdminPanel)
 *          description : action of admin about usere of website
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
router.use("/user" ,UserAdminApiRoutes)
router.use("/podcast" ,PodcastAdminApiRoutes)
router.use("/video" ,VideoAdminApiRoutes)
router.use("/event" ,EventAdminApiRoutes)
router.use("/chapter" , ChapterAdminApiRoutes)
router.use("/episode" , EpisodeAdminApiRoutes)
router.use("/role" , RoleAdminApiRoutes)
router.use("/permission" , PermissionAdminApiRoutes)
module.exports = {
    AdminRoutes : router
}