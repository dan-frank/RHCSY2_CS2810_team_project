/**
 * @api {delete} /menu_items/:menuItemId Delete Menu Item
 * @apiVersion 4.0.0
 * @apiName DeleteMenuItem
 * @apiGroup MenuItems
 *
 * @apiParam {number} menuItemId Unique menu item ID.
 *
 * @apiSuccess {number} id Menu item ID.
 * @apiSuccess {number} category_id Menu item category ID.
 * @apiSuccess {string} category_name Menu item category name.
 * @apiSuccess {string} category_slug Menu item category slug.
 * @apiSuccess {string} title Title of menu item.
 * @apiSuccess {string} description Description of the menu item.
 * @apiSuccess {number} calories Menu item calories.
 * @apiSuccess {number} price Menu item price.
 * @apiSuccess {Boolean} deleted True if menu item is deleted (i.e. don't showing).
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 1,
 *   "category_id": 2,
 *   "category_name": "Main",
 *   "category_slug": "main",
 *   "title": "Grilled Onion & Skirt Steak Tacos",
 *   "description": "I grew up watching my grandmother and mother in the kitchen. My grandparents came from Mexico, and this steak marinated in beer and lime juice honors their passion for cooking. It’s a must in my house when we’re craving traditional Mexican food. —Adan Franco, Milwaukee, Wisconsin",
 *   "calories": "288",
 *   "price": "1299",
 *   "deleted": true
 * }
 *
 * @apiError MenuItemNotFound Menu Items was not found so can not be deleted.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "MenuItemNotFound"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const { menuItemId } = req.params;

  try {
    let query = `UPDATE menu_items
       SET deleted=true,
       updated_at=NOW()
       WHERE id = ${menuItemId}
       RETURNING *`;

    const result = await pool.query(query);

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "MenuItemNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
