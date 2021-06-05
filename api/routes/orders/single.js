/**
 * @api {get} /orders/:orderId Request Order
 * @apiVersion 2.0.0
 * @apiName GetOrder
 * @apiGroup Orders
 *
 * @apiParam {number} orderId Unique order ID.
 *
 * @apiSuccess {number} id Order ID.
 * @apiSuccess {number} table_number Table number asigned to order.
 * @apiSuccess {number} price Order price.
 * @apiSuccess {number} discount Order discount.
 * @apiSuccess {number} final_price Order final_price.
 * @apiSuccess {string} comment Order comment.
 * @apiSuccess {number} order_status_id Status ID for order.
 * @apiSuccess {Date} ordered_at Date order was ordered.
 * @apiSuccess {Date} food_ready_at Date order was prepared.
 * @apiSuccess {Date} updated_at Date order was last updated.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 2,
 *   "table_number": 22,
 *   "price": 2897,
 *   "discount": 0,
 *   "final_price": 2897,
 *   "comment": "This is a test order",
 *   "order_status_id": 2,
 *   "ordered_at": "2021-03-09T22:33:30.546Z",
 *   "food_ready_at": null,
 *   "updated_at": "2021-03-09T22:33:30.546Z"
 * }
 *
 * @apiError OrderNotFound Order was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrderNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await pool.query(
      `SELECT * FROM orders
       WHERE id = ${orderId}
       LIMIT 1`
    );

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "OrderNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
