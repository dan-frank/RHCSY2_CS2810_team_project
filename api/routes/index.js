const routes = require("express").Router();
const categories = require("./categories");
const checkout = require("./checkout");
const menuItems = require("./menuItems");
const ordererdItems = require("./orderedItems");
const orderPayments = require("./orderPayments");
const orders = require("./orders");
const orderStatus = require("./orderStatus");
const waiters = require("./waiters");
const allergies = require("./allergies");
const callWaiter = require("./callWaiter");

routes.get("/", (req, res) => {
  res.status(200).json({ message: "Connected to Team18's Restaurant API!" });
});

routes.use("/categories", categories);
routes.use("/checkout", checkout);
routes.use("/menu_items", menuItems);
routes.use("/ordered_items", ordererdItems);
routes.use("/order_payments", orderPayments);
routes.use("/orders", orders);
routes.use("/order_status", orderStatus);
routes.use("/waiters", waiters);
routes.use("/allergies", allergies);
routes.use("/callWaiter", callWaiter);

module.exports = routes;
