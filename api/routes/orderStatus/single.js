/**
 * @api {get} /order_status/:orderStatusId Request Order Status
 * @apiVersion 3.0.0
 * @apiName GetOrderStatus
 * @apiGroup OrderStatuses
 *
 * @apiParam {number} orderStatusId Unique order status ID.
 *
 * @apiSuccess {number} id ID of the order status.
 * @apiSuccess {string} status The order status.
 * @apiSuccess {Date} created_at Date Category was created.
 * @apiSuccess {Date} updated_at Date Category was last updated.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "status": "Ordered",
 *   "created_at": "2021-03-09T22:33:30.526Z",
 *   "updated_at": "2021-03-09T22:33:30.526Z"
 * }
 *
 * @apiError OrderStatusNotFound Order status was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrderStatusNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { orderStatusId } = req.params;
    const result = await pool.query(
      `SELECT * FROM order_status
      WHERE id = ${orderStatusId}
      LIMIT 1`
    );

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "OrderStatusNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
