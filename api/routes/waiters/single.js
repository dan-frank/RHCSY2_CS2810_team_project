/**
 * @api {get} /waiters/:waiterId Request Waiter Name
 * @apiVersion 2.0.0
 * @apiName GetWaiterNAme
 * @apiGroup Waiters
 *
 * @apiParam {number} waiterId Unique waiter ID.
 *
 * @apiSuccess {string} name Name of the waiter.
 *
 * @apiSuccessExample Success-Response:
 * {
 *    "name": "John",
 * }
 *
 * @apiError WaiterNotFound Waiter was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "WaiterNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { waiterId } = req.params;
    const result = await pool.query(
      `SELECT name FROM waiters
      WHERE id = ${waiterId}
      LIMIT 1`
    );

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "WaiterNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
