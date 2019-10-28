"use strict";

var _e2e = require("./e2e");

var _setup = require("./setup");

var _test_deploy_kardia = require("./test_deploy_kardia");

var command = process.argv[2];
switch (command) {
  case "e2e":
    (0, _e2e.test)().then(function (msg) {
      console.log(msg);
    }).catch(function (e) {
      console.log(e);
    });break;
  case "setup":
    (0, _setup.setup)().then(function (msg) {
      console.log(msg);
    }).catch(function (e) {
      console.log(e);
    });break;
  case "deploy":
    (0, _test_deploy_kardia.deployTest)().then(function (msg) {
      console.log(msg);
    }).catch(function (e) {
      console.log(e);
    });break;
  default:
    console.log("command not found");
}