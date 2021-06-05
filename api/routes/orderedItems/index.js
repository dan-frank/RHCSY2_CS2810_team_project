const orderedItems = require("express").Router();
const all = require("./all");
const orderItems = require("./orderItems");
const single = require("./single");
const addOrderItems = require("./addOrderItems");

orderedItems.get("/", all);
orderedItems.get("/:orderId", orderItems);
orderedItems.get("/item/:orderedItemId", single);

orderedItems.post("/:orderId", addOrderItems);

module.exports = orderedItems;
