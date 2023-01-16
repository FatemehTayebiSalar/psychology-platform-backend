const { AdminPsychologistController } = require("../../http/controllers/admin/psychologist.controller");
const { PsychologistsPageController } = require("../../http/controllers/api/psychologistsPage.controller");



const router = require("express").Router();


router.get("/" , PsychologistsPageController.getListOfPsychologists)
router.get("/:id", PsychologistsPageController.getPsychologistById);



module.exports = {
    PsychologistPageApiRoutes : router
}