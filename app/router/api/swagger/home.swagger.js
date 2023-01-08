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