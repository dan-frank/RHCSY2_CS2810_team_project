/**
 * @api {post} /ordered_items/ Add Ordered Item
 * @apiVersion 4.0.0
 * @apiName AddOrderedItem
 * @apiGroup OrderedItems
 *
 * @apiParam {number} orderId Order to add menu items too.
 * @apiParam {array[]} menuItemIds List of menu items to add to order.
 * @apiParam {array[]} menuItemCounts List of times menu items were ordered.
 *
 * @apiParamExample Example Body:
 * {
 *   orderId: 1,
 *   menuItemIds: [1,2,3],
 *   menuItemCounts: [1,1,3],
 * }
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
 *     "id": 9,
 *     "order_id": 1,
 *     "menu_item_id": 1,
 *     "item_count": 1,
 *     "created_at": "2021-03-09T22:33:30.555Z",
 *     "updated_at": "2021-03-09T22:33:30.555Z"
 *   },
 *   ...
 * ]
 *
 * @apiError Required parameter(s) was/were not passed.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 400,
 *   "error": "OrderedItemsNotCreated",
 *   "errors": [
 *     "No orderId provided",
 *     "No menuItemIds provided",
 *     "No menuItemCounts provided"
 *   ]
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { menuItemIds, menuItemCounts } = req.query;

    errors = [];
    if (!orderId) errors.push("No orderId provided");
    if (!menuItemIds) errors.push("No menuItemIds provided");
    if (!menuItemCounts) errors.push("No menuItemCounts provided");

    if (errors.length > 0) {
      res
        .status(400)
        .json({ status: 400, error: "OrderedItemsNotCreated", errors });
      return;
    }

    let price = 0;
    let values = "";

    menuItemIds.forEach(async (menuItemId, index) => {
      values +=
        (index > 0 ? "," : "") +
        `(${orderId}, ${menuItemId}, ${menuItemCounts[index]})`;
      menuItemResult = await pool.query(
        `SELECT price
         FROM menu_items
         WHERE id = ${menuItemId}
         LIMIT 1;`
      );
      price +=
        parseInt(menuItemResult.rows[0].price) *
        parseInt(menuItemCounts[index]);

      await pool.query(
        `UPDATE orders
         SET price = ${price}, final_price = ${price}
         WHERE id = ${orderId};`
      );
    });

    await pool.query(
      `INSERT INTO ordered_items(order_id, menu_item_id, item_count)
       VALUES ${values};`
    );
    res.status(200).json({
      orderId,
      menuItemIds,
      menuItemCounts,
      price,
    });
  } catch (err) {
    console.error(err.message);
  }
};
