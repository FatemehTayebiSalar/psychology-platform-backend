const homeController = require("../../http/controllers/api/home.controller");
const { veifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

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
 *      parameters:
 *          -   in : header
 *              name: access-token
 *              example: Bearer YourToken... 
 *      responses:
 *          200:
 *              description: Success
 *          404:
 *              description: Not Found
 */
router.get("/",veifyAccessToken,homeController.indexPage);
module.exports = {
    HomeRoutes : router
}