/**
 * @api {get} /categories/:categoryId Request Category
 * @apiVersion 1.0.0
 * @apiName GetCategory
 * @apiGroup Categories
 *
 * @apiParam {number} categoryId Unique category ID.
 *
 * @apiSuccess {number} id ID of the Category.
 * @apiSuccess {string} name Name of the Category.
 * @apiSuccess {string} slug Slug of the Category.
 * @apiSuccess {string} description Description of the Category.
 * @apiSuccess {Date} created_at Date Category was created.
 * @apiSuccess {Date} updated_at Date Category was last updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Starter",
 *       "slug": "starter",
 *       "description": "A starter is...",
 *       "created_at": "2021-03-09T22:33:30.491Z",
 *       "updated_at": "2021-03-09T22:33:30.491Z"
 *     }
 *
 * @apiError CategoryNotFound The id of the Category was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": 404,
 *       "error": "CategoryNotFound"
 *     }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const results = await pool.query(
      `SELECT * FROM categories
      WHERE id = ${categoryId}
      LIMIT 1`
    );

    if (results.rows[0]) res.status(200).json(results.rows[0]);
    else res.status(404).json({ status: 404, error: "CategoryNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
