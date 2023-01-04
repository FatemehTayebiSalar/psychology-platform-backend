const { AdminChapterController } = require("../../http/controllers/admin/chapter.controller");

const router = require("express").Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddChapter:
 *              type: object
 *              required:
 *                  -   mainFileID
 *                  -   title
 *              properties:
 *                  mainFileID:
 *                      type: string
 *                      example: 63b308d46f4fd8878a42b85b
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
 *  /admin/chapter/add/{modelName}:
 *      put:
 *          tags: [Chapter(AdminPanel)]
 *          summary: create new chapter
 *          parameters:
 *              -   in: path
 *                  name: modelName    
 *                  required : true
 *                  type: string
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

router.put("/add/:modelName" , AdminChapterController.addChapter)

/**
 * @swagger
 *  /admin/chapter/list/{modelName}/{mainFileID}:
 *      get:
 *          tags: [Chapter(AdminPanel)]
 *          summary: get chapters of video or podcast
 *          parameters:
 *              -   in: path
 *                  name: modelName
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: mainFileID
 *                  type: string
 *                  required: true      
 *          responses:
 *              200:
 *                  description: success                
 */

router.get("/list/:modelName/:mainFileID" , AdminChapterController.getListOfChapters)

/**
 * @swagger
 *  /admin/chapter/{modelName}/{chapterID}:
 *      get:
 *          tags : [Chapter(AdminPanel)]
 *          summary: get chapter by ID 
 *          parameters:
 *              -   in: path
 *                  name: modelName
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  description : ObjectId of chapter
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

 router.get("/:modelName/:chapterID", AdminChapterController.getChapterById);

/**
 * @swagger
 *  /admin/chapter/update/{modelName}/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: Update details of chapter
 *          parameters:
 *              -   in: path
 *                  name: modelName
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true
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

router.patch("/update/:modelName/:chapterID" , AdminChapterController.updateChapterById)

/**
 * @swagger
 *  /admin/chapter/remove/{modelName}/{chapterID}:
 *      patch:
 *          tags: [Chapter(AdminPanel)]
 *          summary: delete chapter of video by id
 *          parameters:
 *              -   in: path
 *                  name: modelName
 *                  type: string
 *                  required: true
 *              -   in: path
 *                  name: chapterID
 *                  type: string
 *                  required: true      
 *          responses:
 *              200:
 *                  description: success                
 */

router.patch("/remove/:modelName/:chapterID" , AdminChapterController.removeChapterById)

module.exports = {
    ChapterAdminApiRoutes : router
}