/**
 * @api {get} /order_payments/ Request All Order Payments
 * @apiVersion 4.0.0
 * @apiName GetOrderPayments
 * @apiGroup OrderPayments
 *
 * @apiSuccess {number} id Ordered item ID.
 * @apiSuccess {number} order_id The order ID for assigned payment.
 * @apiSuccess {string} payment_intent_id Stripe payment intent ID.
 * @apiSuccess {string} payment_intent_status Indication of payment status ("succeeded", "failed", etc.).
 * @apiSuccess {Date} created_at Date ordered item was created.
 * @apiSuccess {Date} updated_at Date ordered item was last updated.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 1,
 *     "order_id": 1,
 *     "payment_intent_id": "pi_1IQfkPGFZKvUnuw293LNfUnd",
 *     "payment_intent_status": "succeeded",
 *     "created_at": "2021-03-09T22:33:30.565Z",
 *     "updated_at": "2021-03-09T22:33:30.565Z"
 *   },
 *   ...
 * ]
 *
 * @apiError OrderPaymentsNotFound Order payments were not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrderPaymentsNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM order_payments`);

    if (results.rows.length > 0) res.status(200).json(results.rows);
    else res.status(404).json({ status: 404, error: "OrderPaymentsNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
