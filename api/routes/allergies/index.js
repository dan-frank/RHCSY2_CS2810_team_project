const allergies = require("express").Router();
const all = require("./all");
const single = require("./single");

allergies.get("/", all);
allergies.get("/:menuId", single);

module.exports = allergies;
