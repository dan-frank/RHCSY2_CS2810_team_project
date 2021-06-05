/**
 * @api {get} /ordered_items/ Request All Ordered Items
 * @apiVersion 2.0.0
 * @apiName GetOrderedItems
 * @apiGroup OrderedItems
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
 * [
 *   {
 *     "id": 1,
 *     "order_id": 1,
 *     "menu_item_id": 1,
 *     "item_count": 1,
 *     "created_at": "2021-03-09T22:33:30.555Z",
 *     "updated_at": "2021-03-09T22:33:30.555Z"
 *   },
 *   ...
 * ]
 *
 * @apiError OrderedItemsNotFound Ordered Items were not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrderedItemsNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM ordered_items`);

    if (results.rows.length > 0) res.status(200).json(results.rows);
    else res.status(404).json({ status: 404, error: "OrderedItemsNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
