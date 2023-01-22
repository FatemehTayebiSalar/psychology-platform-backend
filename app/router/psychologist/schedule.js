const { PsychologistScheduleContoller } = require("../../http/controllers/psychologist/schedules.controller");

const router = require("express").Router();


router.patch("/add" , PsychologistScheduleContoller.addSchedule)
// router.get("/" , AdminPsychologistController.getListOfPsychologists);
// router.get("/:id", AdminPsychologistController.getPsychologistById);
// router.patch("/update/:id",uploadPicture.single("profileImage"), AdminPsychologistController.updatePsychologistById)
// router.delete("/remove/:id", AdminPsychologistController.deletePsychologistById);

module.exports = {
    PsychologistScheduleApiRoutes : router
}