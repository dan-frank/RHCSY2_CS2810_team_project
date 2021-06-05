/**
 * @api {post} /order_payments/ Add Order Payment
 * @apiVersion 4.0.0
 * @apiName AddOrderPayment
 * @apiGroup OrderPayments
 *
 * @apiParam {number} orderId Order to link to payment too.
 * @apiParam {string} paymentIntentId Stripe payment intent ID.
 * @apiParam {string} paymentIntentStatus Indication of payment status ("succeeded", "failed", etc.)..
 *
 * @apiParamExample Example Body:
 * {
 *   "order_id": 1,
 *   "payment_intent_id": "pi_1IQfkPGFZKvUnuw293LNfUnd",
 *   "payment_intent_status": "succeeded",
 * },
 *
 * @apiSuccess {number} id Ordered item ID.
 * @apiSuccess {number} order_id The order ID for assigned order.
 * @apiSuccess {number} menu_item_id Menu item ordered.
 * @apiSuccess {number} item_count Total amount menu item was ordered.
 * @apiSuccess {Date} created_at Date ordered item was created.
 * @apiSuccess {Date} updated_at Date ordered item was last updated.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "order_id": 1,
 *   "payment_intent_id": "pi_1IQfkPGFZKvUnuw293LNfUnd",
 *   "payment_intent_status": "succeeded",
 *   "created_at": "2021-03-09T22:33:30.565Z",
 *   "updated_at": "2021-03-09T22:33:30.565Z"
 * }
 *
 * @apiError Required parameter(s) was/were not passed.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 400,
 *   "error": "OrderPaymentNotCreated",
 *   "errors": [
 *     "No orderId provided",
 *     "No paymentIntentId provided",
 *     "No paymentIntentStatus provided"
 *   ]
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { orderId, paymentIntentId, paymentIntentStatus } = req.query;

    errors = [];
    if (!orderId) errors.push("No orderId provided");
    if (!paymentIntentId) errors.push("No paymentIntentId provided");
    if (!paymentIntentStatus) errors.push("No paymentIntentStatus provided");

    if (errors.length > 0) {
      res
        .status(400)
        .json({ status: 400, error: "OrderPaymentNotCreated", errors });
      return;
    }

    const result = await pool.query(
      `INSERT INTO order_payments (order_id, payment_intent_id, payment_intent_status)
        VALUES (${orderId}, '${paymentIntentId}', '${paymentIntentStatus}')
        RETURNING *`
    );

    res.status(200).json({ order_payment: result.rows[0] });
  } catch (err) {
    console.error(err.message);
  }
};
