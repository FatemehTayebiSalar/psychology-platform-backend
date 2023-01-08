const { AdminPodcastController } = require("../../http/controllers/admin/podcast.controller");
const {uploadFile} = require("../../utils/multer")

const router = require("express").Router();


router.post("/add",uploadFile.single("coverImage"), AdminPodcastController.addPodcast)
router.get("/" , AdminPodcastController.getListOfPodcasts)
router.get("/:id", AdminPodcastController.getPodcastById);
router.patch("/update/:id",uploadFile.single("coverImage"), AdminPodcastController.updatePodcastById)
router.delete("/:id", AdminPodcastController.deletePodcastById);


module.exports = {
    PodcastAdminApiRoutes : router
}