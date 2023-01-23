const { PsychologistScheduleContoller } = require("../../http/controllers/psychologist/schedules.controller");

const router = require("express").Router();


router.patch("/add"  ,PsychologistScheduleContoller.addSchedule)
router.get("/" , PsychologistScheduleContoller.getschedules);
router.patch("/remove/:scheduleID" , PsychologistScheduleContoller.removeScheduleById)

module.exports = {
    PsychologistScheduleApiRoutes : router
}