/**
 * @api {put} /menu_items/:menuItemId Update Menu Item
 * @apiVersion 4.0.0
 * @apiName UpdateMenuItem
 * @apiGroup MenuItems
 *
 * @apiParam {number} menuItemId Unique menu item ID.
 * @apiParam {string} title Menu item title.
 * @apiParam {string} description Menu item description.
 * @apiParam {number} price Menu item price.
 * @apiParam {number} calories Menu item calories.
 * @apiParam {number} categoryId Menu item calories.
 * @apiParam {Boolean} deleted Menu item calories.
 *
 * @apiParamExample Example Body:
 * {
 *   title: "Updated Menu Item Title",
 *   description: "This is an udpated menu item description",
 *   price: 349,
 *   calories: 203,
 *   categoryId: 1,
 *   deleted: false
 * }
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
 *   "id": 10,
 *   "category_id": 1,
 *   "category_name": "Starter",
 *   "category_slug": "starter",
 *   "title": "New Menu Item",
 *   "description": "This is a new menu item",
 *   "calories": "203",
 *   "price": "349",
 *   "deleted": false
 * }
 *
 * @apiError MenuItemNotUpdated Menu Items was not updated.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400
 * {
 *   "status": 400,
 *   "error": "MenuItemNotUpdated"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const { menuItemId } = req.params;
  let { title, description } = req.query;
  const price = parseInt(req.query.price);
  const calories = parseInt(req.query.calories);
  const categoryId = parseInt(req.query.categoryId);
  const deleted = req.query.delete;

  try {
    let query = `UPDATE menu_items
       SET`;

    if (categoryId) query += ` category_id='${categoryId}',`;
    if (title) {
      title = title.replaceAll("'", "''");
      query += ` title='${title}',`;
    }
    if (description) {
      description = description.replaceAll("'", "''");
      query += ` description='${description}',`;
    }
    if (price) query += ` price='${price}',`;
    if (calories) query += ` calories='${calories}',`;
    if (deleted) query += ` deleted=true,`;
    else query += ` deleted=false,`;

    query += ` updated_at=NOW()
       WHERE id = ${menuItemId}
       RETURNING *`;

    const result = await pool.query(query);

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(400).json({ status: 400, error: "MenuItemNotUpdated" });
  } catch (err) {
    console.error(err.message);
  }
};
