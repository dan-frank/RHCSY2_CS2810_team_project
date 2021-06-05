/**
 * @api {post} /checkout/ Create Stripe Client Secret Key
 * @apiVersion 4.0.0
 * @apiName PostStripeClientSecret
 * @apiGroup Checkout
 *
 * @apiParam {number} amount Total cost to be payed in pennies, required.
 *
 * @apiParamExample Example Body:
 * {
 *   amount: 100
 * }
 *
 * @apiSuccess {string} client_secret Generated client secret key from Stripe.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "client_secret": "pi_1IVbOSGFZKvUnuw2FydHvYSY_secret_M0gkg2bQKOBlk11xw2xPPpCWQ"
 * }
 *
 * @apiError MissingParams Missing required param: amount.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 400,
 *   "error": "ClientSecretNotGenerated",
 *   "errors": [
 *     "No amount provided"
 *   ]
 * }
 *
 * @apiError MissingParams Missing required param: amount (Stripe).
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "statusCode": 500,
 *   "message": "Missing required param: amount."
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const stripe = res.locals["stripe"];

  try {
    const { amount } = req.query;

    errors = [];
    if (!amount) errors.push("No amount provided");

    if (errors.length > 0) {
      res
        .status(400)
        .json({ status: 400, error: "ClientSecretNotGenerated", errors });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "GBP",
    });

    res.status(200).send({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ statusCode: 500, message: err.message });
  }
};
