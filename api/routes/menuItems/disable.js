/**
 * @api {get} /menu_items/ Disable Menu Items
 * @apiVersion 3.0.0
 * @apiName Disable
 * @apiGroup MenuItems
 *
 * @apiParam {Boolean} disabling Menu item disabling.
 *
 * @apiSuccess {Boolean} disabling True if menu item is disabled.
 * @apiSuccess {number} menuItemId ID of the menu item.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": 2,
 *   "disabling": false,
 *   "created_at": "2021-03-25T23:33:46.526Z",
 *   "updated_at": "2021-03-25T23:33:46.526Z"
 * }
 *
 * @apiError DisableNotFound Disable was not found.
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *   "status": 404,
 *   "error": "DisableNotFound"
 * }
 */
const { pool } = require("../../pool");

module.exports = async (req, res) => {
  const { menuItemId } = req.params;
  const disable = req.query.disable;
  const io = res.locals["socketio"];

  try {
    let query = `UPDATE menu_items
      SET disabling=${disable}, updated_at=NOW()
      WHERE id = ${menuItemId}
      RETURNING *`;

    const result = await pool.query(query);

    const returnedMenuItem = await pool.query(
      `SELECT mi.id, c.id as category_id, c.name as category_name, c.slug as category_slug, mi.title, mi.description, mi.calories, mi.price, mi.disabling, mi.deleted 
       FROM menu_items mi, categories c 
       WHERE mi.category_id = c.id AND mi.id = ${menuItemId}
       LIMIT 1`
    );

    res.status(200).json(returnedMenuItem.rows[0]);
    io.emit("toggleAvailability", returnedMenuItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};
