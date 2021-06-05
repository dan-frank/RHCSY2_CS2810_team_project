/**
 * @api {get} /allergy/ Request Allergy
 * @apiVersion 1.0.0
 * @apiName GetAllergy
 * @apiGroup Allergies
 *
 * @apiSuccess {number} id ID of the Allergy.
 * @apiSuccess {number} menu_item_id Menu Item Id of the Allergy.
 * @apiSuccess {string} name Name of the Allergy.
 * @apiSuccess {Date} created_at Date Allergy was created.
 * @apiSuccess {Date} updated_at Date Allergy was last updated.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 6,
 *         "menu_item_id": "3",
 *         "name": "Eggs",
 *         "created_at": "2021-03-09T22:33:30.491Z",
 *         "updated_at": "2021-03-09T22:33:30.491Z"
 *       },
 *       ...
 *     ]
 *
 * @apiError AllergyNotFound The id of the Allergy was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": 404,
 *       "error": "AllergyNotFound"
 *     }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { menuId } = req.params;
    const results = await pool.query(
      `SELECT * FROM allergies
      WHERE menu_item_id = ${menuId}`
    );

    if (results.rows.length > 0) res.status(200).json(results.rows);
    else res.status(404).json({ status: 404, error: "AllergyNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
