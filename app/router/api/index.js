const homeController = require("../../http/controllers/api/home.controller");

const router =  require("express").Router();

/**
 * @swagger
 * tags:
 *  name: IndexPage
 *  description : Website homepage apis
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description : Getting required data for the index page
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 */
router.get("/",homeController.indexPage);
module.exports = {
    HomeRoutes : router
}