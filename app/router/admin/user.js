const { AdminUserController } = require("../../http/controllers/admin/user.controller");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constants");

const router = require("express").Router();


router.get("/" ,checkPermission([PERMISSIONS.ADMIN]) ,AdminUserController.getAllUsers)


module.exports = {
    UserAdminApiRoutes : router
}