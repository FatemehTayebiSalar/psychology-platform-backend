const { AdminApplicationController } = require("../../http/controllers/admin/applications.controller");


const router = require("express").Router();



router.get("/" , AdminApplicationController.getApplications);
router.get("/:applicationID", AdminApplicationController.getApplicationById);

router.patch("/update/:applicationID", AdminApplicationController.responseToApplications)

module.exports = {
    ApplicationAdminApiRoutes : router
}