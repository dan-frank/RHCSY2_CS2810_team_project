const orderStatus = require("express").Router();
const all = require("./all");
const single = require("./single");

orderStatus.get("/", all);
orderStatus.get("/:orderStatusId", single);

module.exports = orderStatus;
