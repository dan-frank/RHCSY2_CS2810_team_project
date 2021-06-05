let chai = require("chai");
let chaiHttp = require("chai-http");
process.env.NODE_ENV = "test";
let api = require("../app");

// Assertion style
chai.should();
chai.use(chaiHttp);

module.exports.chai = chai;
module.exports.api = api;
