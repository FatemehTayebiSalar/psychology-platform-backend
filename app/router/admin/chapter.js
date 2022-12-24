const { AdminChapterController } = require("../../http/controllers/admin/chapter.controller");

const router = require("express").Router();
router.put("/add" , AdminChapterController.addChapter)

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
 *                      example: 123
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
module.exports = {
    ChapterAdminApiRoutes : router
}