/**
 * @api {get} /menu_items/:menuItemId Request Menu Item
 * @apiVersion 1.0.0
 * @apiName GetMenuItem
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
 * @apiSuccess {Boolean} disabling True if menu item is disabled.
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
 *   "disabling": false,
 *   "deleted": false
 * }
 *
 * @apiError MenuItemsNotFound Menu Item not found.
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
  try {
    const { menuItemId } = req.params;
    const result = await pool.query(
      `SELECT mi.id, c.id as category_id, c.name as category_name, c.slug as category_slug, mi.title, mi.description, mi.calories, mi.price, mi.disabling, mi.deleted 
       FROM menu_items mi, categories c 
       WHERE mi.category_id = c.id AND mi.id = ${menuItemId}
       LIMIT 1`
    );

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "MenuItemNotFound" });
  } catch (err) {
    console.error(err.message);
  }
};
