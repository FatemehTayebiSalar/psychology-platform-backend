const { UserApplyContoller } = require("../../http/controllers/user/apply.controller");
const { uploadPicture } = require("../../utils/multer");

const router = require("express").Router();


router.post("/add" , uploadPicture.array("files" , 3) , UserApplyContoller.applyPsychologistRole)


module.exports = {
    UserApplyRoutes : router
}