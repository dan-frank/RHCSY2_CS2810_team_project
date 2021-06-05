const waiters = require("express").Router();
const all = require("./all");
const single = require("./single");

waiters.get("/", all);
waiters.get("/:waiterId", single)

module.exports = waiters;
