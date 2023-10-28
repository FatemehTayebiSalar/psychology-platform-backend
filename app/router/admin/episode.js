const { AdminEpisodeController } = require("../../http/controllers/admin/episode.controller");
const { uploadFile} = require("../../utils/multer");

const router = require ("express").Router();


router.post("/add/:modelName" , uploadFile.single("file") ,AdminEpisodeController.addEpisode)
router.patch("/update/:modelName/:episodeID",uploadFile.single("file"), AdminEpisodeController.updateEpisodeById)
router.patch("/remove/:modelName/:episodeID", AdminEpisodeController.removeEpisode );


module.exports = { 
    EpisodeAdminApiRoutes : router
}