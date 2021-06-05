const orders = require("express").Router();
const all = require("./all");
const single = require("./single");
const addOrder = require("./addOrder");
const updateOrderStatus = require("./updateOrderStatus");
const updateWaiter = require("./updateWaiter");

orders.get("/", all);
orders.get("/:orderId", single);

orders.post("/", addOrder);

orders.put("/waiters", updateWaiter);
orders.put("/order_status", updateOrderStatus);

module.exports = orders;
