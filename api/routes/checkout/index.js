const menuItems = require("express").Router();
const clientSecret = require("./clientSecret");

menuItems.post("/", clientSecret);

module.exports = menuItems;
