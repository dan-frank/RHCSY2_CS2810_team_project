/**
 * @api {get} /orders/ Request All Orders
 * @apiVersion 2.0.0
 * @apiName GetOrders
 * @apiGroup Orders
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
 * [
 *   {
 *     "id": 2,
 *     "table_number": 22,
 *     "price": 2897,
 *     "discount": 0,
 *     "final_price": 2897,
 *     "comment": "This is a test order",
 *     "order_status_id": 2,
 *     "ordered_at": "2021-03-09T22:33:30.546Z",
 *     "food_ready_at": null,
 *     "updated_at": "2021-03-09T22:33:30.546Z"
 *   },
 *   ...
 * ]
 *
 * @apiError OrdersNotFound Orders were not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrdersNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const { orderStatus } = req.query;

  try {
    orderQuery = `SELECT * FROM orders`;
    if (orderStatus) {
      orderQuery += ` WHERE order_status_id = ${orderStatus}`;
    } else {
      orderQuery += ` WHERE NOT order_status_id=4`;
    }
    orderQuery += ` ORDER BY ordered_at ASC`;

    const results = await pool.query(orderQuery);

    if (results.rows.length > 0) res.status(200).json(results.rows);
    else res.status(404).json({ status: 404, error: "OrdersNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
