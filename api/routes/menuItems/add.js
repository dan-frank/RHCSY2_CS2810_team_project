/**
 * @api {post} /menu_items/ Add Menu Item
 * @apiVersion 4.0.0
 * @apiName AddMenuItem
 * @apiGroup MenuItems
 *
 * @apiParam {number} categoryId ID of category menu item belongs too.
 * @apiParam {string} title Menu item title.
 * @apiParam {string} description Menu item description.
 * @apiParam {number} calories Menu item calories.
 * @apiParam {number} price Menu item price.
 *
 * @apiParamExample Example Body:
 * {
 *   categoryId: 1,
 *   title: "New Menu Item",
 *   description: "This is a new menu item",
 *   calories: 203,
 *   price: 349
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
 * @apiError Required parameter(s) was/were not passed.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 400,
 *   "error": "MenuItemNotCreated",
 *   "errors": [
 *     "No title provided",
 *     "No description provided",
 *     "No price provided",
 *     "No calories provided",
 *     "No category ID provided"
 *   ]
 * }
 *
 * @apiError MenuItemNotCreated Menu Items was not created.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "MenuItemNotCreated"
 * }
 */

const { pool } = require("../../pool");

module.exports = async (req, res) => {
  try {
    const categoryId = parseInt(req.query.categoryId);
    const title = req.query.title
      ? req.query.title.replaceAll("'", "''")
      : null;
    const description = req.query.description
      ? req.query.description.replaceAll("'", "''")
      : null;
    const calories = parseInt(req.query.calories);
    const price = parseInt(req.query.price);

    errors = [];
    if (!title) errors.push("No title provided");
    if (!description) errors.push("No description provided");
    if (!price) errors.push("No price provided");
    if (!calories) errors.push("No calories provided");
    if (!categoryId) errors.push("No category ID provided");

    if (errors.length > 0) {
      res
        .status(400)
        .json({ status: 400, error: "MenuItemNotCreated", errors });
      return;
    }

    const result = await pool.query(
      `INSERT INTO menu_items (category_id, title, description, calories, price, stock)
       VALUES (${categoryId}, '${title}', '${description}', ${calories}, ${price}, 100)
       RETURNING *`
    );

    if (result.rows[0]) res.status(200).json(result.rows[0]);
    else res.status(404).json({ status: 404, error: "MenuItemNotCreated" });
  } catch (err) {
    console.error(err.message);
  }
};
