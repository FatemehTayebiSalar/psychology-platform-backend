const { AdminChapterController } = require("../../http/controllers/admin/chapter.controller");

const router = require("express").Router();


router.put("/add/:modelName" , AdminChapterController.addChapter)
router.get("/list/:modelName/:mainFileID" , AdminChapterController.getListOfChapters)
router.get("/:modelName/:chapterID", AdminChapterController.getChapterById);
router.patch("/update/:modelName/:chapterID" , AdminChapterController.updateChapterById)
router.patch("/remove/:modelName/:chapterID" , AdminChapterController.removeChapterById)


module.exports = {
    ChapterAdminApiRoutes : router
}