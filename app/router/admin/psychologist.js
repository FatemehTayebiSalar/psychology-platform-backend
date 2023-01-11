const { AdminPsychologistController } = require("../../http/controllers/admin/psychologist.controller");
const { uploadPicture } = require("../../utils/multer");


const router = require("express").Router();


router.post("/add" , uploadPicture.single("profileImage") , AdminPsychologistController.addPsychologist)
router.get("/" , AdminPsychologistController.getListOfPsychologists);
router.get("/:id", AdminPsychologistController.getPsychologistById);
router.patch("/update/:id",uploadPicture.single("profileImage"), AdminPsychologistController.updatePsychologistById)
router.delete("/remove/:id", AdminPsychologistController.deletePsychologistById);

module.exports = {
    PsychologistAdminApiRoutes : router
}