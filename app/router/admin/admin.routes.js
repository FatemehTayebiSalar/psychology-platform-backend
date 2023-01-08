const { checkPermission } = require("../../http/middlewares/permission.guard");
const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { PERMISSIONS } = require("../../utils/constants");
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
router.use("/user" ,checkPermission([PERMISSIONS.USER]),UserAdminApiRoutes)
router.use("/podcast",checkPermission([PERMISSIONS.CONTENT_MANAGER]) ,PodcastAdminApiRoutes)
router.use("/video",checkPermission([PERMISSIONS.CONTENT_MANAGER]) ,VideoAdminApiRoutes)
router.use("/event",checkPermission([PERMISSIONS.CONTENT_MANAGER]) ,EventAdminApiRoutes)
router.use("/chapter",checkPermission([PERMISSIONS.CONTENT_MANAGER]) , ChapterAdminApiRoutes)
router.use("/episode",checkPermission([PERMISSIONS.CONTENT_MANAGER]) , EpisodeAdminApiRoutes)
router.use("/role",checkPermission([PERMISSIONS.ADMIN]) , RoleAdminApiRoutes)
router.use("/permission",checkPermission([PERMISSIONS.ADMIN]) , PermissionAdminApiRoutes)
module.exports = {
    AdminRoutes : router
}