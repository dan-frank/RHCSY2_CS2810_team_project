/**
 * @api {post} /orders/ Add Order
 * @apiVersion 2.0.0
 * @apiName AddOrder
 * @apiGroup Orders
 *
 * @apiParam {number} tableNumber Table customers are seated at.
 * @apiParam {number} orderStatus Status ID of newly created order.
 *
 * @apiParamExample Example Body:
 * {
 *   "order_id": 1,
 *   "payment_intent_id": "pi_1IQfkPGFZKvUnuw293LNfUnd",
 *   "payment_intent_status": "succeeded",
 * },
 *
 * @apiSuccess {number} id Newly created order ID.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 3
 * }
 *
 * @apiError Required parameter(s) was/were not passed.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 400,
 *   "error": "OrderNotCreated",
 *   "errors": [
 *     "No tableNumber provided",
 *     "No orderStatus provided"
 *   ]
 * }
 *
 * @apiError OrderNotCreated Order was not created.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400
 * {
 *   "status": 400,
 *   "error": "OrderNotCreated"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { tableNumber, orderStatus } = req.query;
    const io = res.locals["socketio"];

    errors = [];
    if (!tableNumber) errors.push("No tableNumber provided");
    if (!orderStatus) errors.push("No orderStatus provided");

    if (errors.length > 0) {
      res.status(400).json({ status: 400, error: "OrderNotCreated", errors });
      return;
    }

    const result = await pool.query(
      `INSERT INTO orders (table_number, price, discount, final_price, comment, order_status_id)
       VALUES (${tableNumber}, 9999999, 0, 9999999, '---', ${orderStatus})
       RETURNING *`
    );

    if (result.rows[0]) res.status(200).json({ id: result.rows[0].id });
    else res.status(400).json({ status: 400, error: "OrderNotCreated" });
    io.emit("addedOrder", result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
