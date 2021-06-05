/**
 * @api {put} /orders/order_status Update Order Status
 * @apiVersion 2.0.0
 * @apiName UpdateOrderStatus
 * @apiGroup Orders
 *
 * @apiParam {number} orderId Order to update.
 * @apiParam {number} orderStatus Order status ID to update order with.
 *
 * @apiParamExample Example Body:
 * {
 *   orderId: 1,
 *   orderStatus: 2
 * }
 *
 * @apiSuccess {number} orderId Updated order's ID.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "orderId": 1
 * }
 *
 * @apiError Required parameter(s) was/were not passed.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 400,
 *   "error": "OrderStatusNotUpdated",
 *   "errors": [
 *     "No orderId provided",
 *     "No orderStatus provided"
 *   ]
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const orderId = parseInt(req.query.orderId);
  const orderStatus = parseInt(req.query.orderStatus);
  const io = res.locals["socketio"];

  try {
    errors = [];
    if (!orderId) errors.push("No orderId provided");
    if (!orderStatus) errors.push("No orderStatus provided");

    if (errors.length > 0) {
      res
        .status(400)
        .json({ status: 400, error: "OrderStatusNotUpdated", errors });
      return;
    }

    const result = await pool.query(
      `UPDATE orders
     SET order_status_id = ${orderStatus}
     WHERE id = ${orderId}
     RETURNING *`
    );
    res.status(200).json({ orderId, orderStatus });
    if (orderStatus === 2) {
      io.emit("updatedOrderStatusPrepared", orderId);
    }
    io.emit("addedOrder", result.rows[0]);
    io.emit("updatedOrderStatus", orderStatus);
  } catch (err) {
    console.error(err.message);
  }
};
