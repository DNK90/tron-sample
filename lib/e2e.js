"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

var _tronweb = require("tronweb");

var _tronweb2 = _interopRequireDefault(_tronweb);

var _setup = require("./setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractAddress = "41d69c86eeaa2c1ea0e2db91a64c2ed5814ec66470";
var privateKey = "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";
var owner = "41928c9af0651632157ef27a2cf17ca72c575a4d21";

var GET_PENDING_ORDERS = "getPendingOrders";

var tronWeb = new _tronweb2.default("http://35.198.253.44:9090", "http://35.240.187.29:18191", "http://35.198.253.44:9090", privateKey);

/*
1. Rate:
- 1 NEO to TRX: 6482133/16571 = 391.17331483
2. Deposit Scenario:
- Deposit 391.17331483 TRX
- Watch until transaction appeared in TRON
- Watch KAI to see if deposit is saved to smart contract or not.
-

3. Release Scenario:
- Deposit 1 NEO and Watch until KAI stores deposit's info
- Check until 391.17331483 TRX is sent to target address.
 */

var deposit = async function deposit() {
  var exchange = await tronWeb.contract().at(contractAddress);
  return await exchange.deposit("AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y", "NEO").send({
    feeLimit: 100000000,
    callValue: 391173315,
    privateKey: privateKey
  });
};

var getPendingOrders = async function getPendingOrders() {
  var count = 0;
  while (count < 5) {
    var orders = await (0, _setup.invoke)(GET_PENDING_ORDERS, ["TRX", "NEO"], false);
    if (orders || orders.length > 0) {
      return orders;
    }
    count++;
    await (0, _setup.delay)(5000);
  }
  return false;
};

// test does e2e testing
var test = exports.test = async function test() {
  await deposit();
  // delay 10s
  await 10000;

  // get pending orders
  // TODO: compare tx_id from deposit
  return await getPendingOrders();
};