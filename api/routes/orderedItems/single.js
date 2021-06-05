/**
 * @api {get} /ordered_items/item/:orderedItemId Request Ordered Item
 * @apiVersion 2.0.0
 * @apiName GetOrderedItem
 * @apiGroup OrderedItems
 *
 * @apiParam {number} orderedItemId Unique ordered item ID.
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
 *   "menu_item_id": 1,
 *   "item_count": 1,
 *   "created_at": "2021-03-09T22:33:30.555Z",
 *   "updated_at": "2021-03-09T22:33:30.555Z"
 * }
 *
 * @apiError OrderedItemNotFound Ordered Item was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "OrderedItemNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { orderedItemId } = req.params;
    const result = await pool.query(
      `SELECT * FROM ordered_items
       WHERE id = ${orderedItemId}
       LIMIT 1`
    );

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "OrderedItemNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
