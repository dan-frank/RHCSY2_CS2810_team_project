/**
 * @api {put} /orders/waiters Update Waiter
 * @apiVersion 2.0.0
 * @apiName UpdateWaiter
 * @apiGroup Orders
 *
 * @apiParam {number} orderId Order to update.
 * @apiParam {number} waiterId Waiter ID to update order with.
 *
 * @apiParamExample Example Body:
 * {
 *   orderId: 1,
 *   waiterId: 2
 * }
 *
 * @apiSuccess {number} orderId Updated order's ID.
 *
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const { orderId, waiterId } = req.query;

  try {
    const result = await pool.query(
      `UPDATE orders
      SET waiter_id = ${waiterId}
      WHERE id = ${orderId}
      RETURNING *`
    );
    res.status(200).json(result.rows[0]);
    console.log("success");
  } catch (err) {
    console.error(err.message);
  }
};
