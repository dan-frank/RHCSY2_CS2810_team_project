const orderPayments = require("express").Router();
const all = require("./all");
const single = require("./single");
const latestOrderPayment = require("./latestOrderPayment");
const addOrderPayment = require("./addOrderPayment");

orderPayments.get("/", all);
orderPayments.get("/:orderPaymentId", single);
orderPayments.get("/order/:orderId", latestOrderPayment);

orderPayments.post("/", addOrderPayment);

module.exports = orderPayments;
