const callWaiter = require("express").Router();

const callWaiterUpdate = require("./callWaiterUpdate");

callWaiter.get("/", callWaiterUpdate);

module.exports = callWaiter;
