/**
 * @api {get} /waiters/ Request All Waiters
 * @apiVersion 5.0.0
 * @apiName GetWaiters
 * @apiGroup Waiters
 *
 * @apiSuccess {number} id Waiter ID.
 * @apiSuccess {string} name Name of waiter.
 * @apiSuccess {number} age Age of waiter
 * @apiSuccess {string} email E-mail address of waiter.
 * @apiSuccess {string} address Address of watier.
 * @apiSuccess {number} sales Total sales of waiter.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "name": "John",
 *     "age": 20,
 *     "email": "john@live.rhul.ac.uk",
 *     "address": "RHUL, Egham Hill, Egham TW20 0EX",
 *     "sales": 2
 *   },
 *   ...
 * ]
 *
 * @apiError WaitersNotFound Waiters were not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "WaitersNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT w.id, w.name, w.age, w.email, w.address, COUNT(o.waiter_id) as sales
        FROM waiters w LEFT JOIN
          orders o ON o.waiter_id = w.id
        GROUP BY w.id
        ORDER BY w.id ASC`
    );

    if (results.rows.length > 0) res.status(200).json(results.rows);
    else res.status(404).json({ status: 404, error: "WaitersNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
