const menuItems = require("express").Router();
const all = require("./all");
const single = require("./single");
const add = require("./add");
const update = require("./update");
const deleteMenuItem = require("./delete");
const disable = require("./disable");

menuItems.get("/", all);
menuItems.get("/:menuItemId", single);

menuItems.post("/", add);

menuItems.put("/:menuItemId", update);
menuItems.put("/disable/:menuItemId", disable);

menuItems.delete("/:menuItemId", deleteMenuItem);

module.exports = menuItems;
