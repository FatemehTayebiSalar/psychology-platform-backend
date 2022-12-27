const { AdminChapterController } = require("../../http/controllers/admin/chapter.controller");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                      type: string
 *                      example: 63a2421363ff2f7f78b655f6
 *                  title:
 *                      type: string
 *                      example: chapter 1 of grief
 *                  text:
 *                      type: string
 *                      example: describe aboute this chapter
 *          EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      example: chapter 1 of grief
 *                  text:
 *                      type: string
 *                      example: describe aboute this chapter
 */

/**
 * @swagger
 *  /admin/chapter/add:
 *      put:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create new chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'      
 *          responses:
 *              200:
 *                  description: success                
 */

router.put("/add" , AdminChapterController.addChapter)

/**
 * @swagger
 *  /admin/chapter/list/{videoID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: get chapters of video
 *          parameters:
 *              -   in: path
 *                  name: videoID
 *                  type: string
 *                  required: tue      
 *          responses:
 *              200:
 *                  description: success                
 */

router.get("/list/:videoID" , AdminChapterController.getListOfChapters)

/**
 * @swagger
 *  /admin/chapter/update/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: Update details of chapter
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: tue
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'      
 *          responses:
 *              200:
 *                  description: success                
 */

router.patch("/update/:chapterID" , AdminChapterController.updateChapterById)

/**
 * @swagger
 *  /admin/chapter/remove/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: delete chapter of video by id
 *          parameters:
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: tue      
 *          responses:
 *              200:
 *                  description: success                
 */

router.patch("/remove/:chapterID" , AdminChapterController.removeChapterById)

module.exports = {
    ChapterAdminApiRoutes : router
}