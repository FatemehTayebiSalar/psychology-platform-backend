const { checkPermission } = require("../../http/middlewares/permission.guard");
const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { PERMISSIONS } = require("../../utils/constants");
const { ChapterAdminApiRoutes } = require("./chapter");
const { EpisodeAdminApiRoutes } = require("./episode");
const { EventAdminApiRoutes } = require("./event");
const { PermissionAdminApiRoutes } = require("./permission");
const { PodcastAdminApiRoutes } = require("./podcast");
const { PsychologistAdminApiRoutes } = require("./psychologist");
const { RoleAdminApiRoutes } = require("./role");
const { UserAdminApiRoutes } = require("./user");
const { VideoAdminApiRoutes } = require("./video");

const router = require("express").Router();

router.use("/user" ,checkPermission([PERMISSIONS.USER]),UserAdminApiRoutes)
router.use("/psychologist",checkPermission([PERMISSIONS.ADMIN]) , PsychologistAdminApiRoutes)
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