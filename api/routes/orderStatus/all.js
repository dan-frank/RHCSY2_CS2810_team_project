/**
 * @api {get} /order_status/ Request All Order Statuses
 * @apiVersion 3.0.0
 * @apiName GetOrderStatuses
 * @apiGroup OrderStatuses
 *
 * @apiSuccess {number} id ID of the order status.
 * @apiSuccess {string} status The order status.
 * @apiSuccess {Date} created_at Date Category was created.
 * @apiSuccess {Date} updated_at Date Category was last updated.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "status": "Ordered",
 *     "created_at": "2021-03-09T22:33:30.526Z",
 *     "updated_at": "2021-03-09T22:33:30.526Z"
 *   },
 *   ...
 * ]
 *
 * @apiError OrderStatusesNotFound Order statuses were not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrderStatusesNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM order_status`);

    if (results.rows.length > 0) res.status(200).json(results.rows);
    else res.status(404).json({ status: 404, error: "OrderStatusesNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
