const { AdminPermissionController } = require("../../http/controllers/admin/RBAC/permission.controller");

const router = require("express").Router();


router.post("/add" , AdminPermissionController.createNewPermission)
router.get("/" , AdminPermissionController.getListOfPermissions)
router.patch("/update/:id" , AdminPermissionController.updatePermissionById)
router.delete("/remove/:id" , AdminPermissionController.removePermission)


module.exports = {
    PermissionAdminApiRoutes : router
}