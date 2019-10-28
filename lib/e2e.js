"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test = undefined;

var _tronweb = require("tronweb");

var _tronweb2 = _interopRequireDefault(_tronweb);

var _setup = require("./setup");

var _neo = require("./neo");

var _neo2 = _interopRequireDefault(_neo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractAddress = "41d69c86eeaa2c1ea0e2db91a64c2ed5814ec66470";
var privateKey = "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";
var owner = "41928c9af0651632157ef27a2cf17ca72c575a4d21";

var GET_ORDER_BY_ID = "getOrderByTxIdPublic";

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

var depositTRX = async function depositTRX() {
  var exchange = await tronWeb.contract().at(contractAddress);
  return await exchange.deposit("AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y", "NEO").send({
    feeLimit: 100000000,
    callValue: 391173315,
    privateKey: privateKey
  });
};

var getOrder = async function getOrder(tx_id) {
  var count = 0;
  while (count < 10) {
    var orders = await (0, _setup.invoke)(GET_ORDER_BY_ID, [tx_id], false);
    console.log("result: " + orders);
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
  console.log("depositing TRX");
  var tronTx = await depositTRX();
  console.log(tronTx);

  // get pending orders
  var trxOrder = await getOrder(tronTx);
  if (!trxOrder) return false;

  console.log(trxOrder);
  console.log("depositing NEO");

  // deposit 1 NEO
  var neoTx = await (0, _neo2.default)(1, _setup.TRX_RECEIVER);
  console.log(neoTx);

  var neoOrder = await getOrder(neoTx);
  if (!neoOrder) return false;
  console.lg(neoOrder);

  // delay to make 2 orders match to each other then get order again to see all txs are fulfilled or not.
  (0, _setup.delay)(10000);

  trxOrder = await getOrder(tronTx);
  console.log("trxOrder = " + trxOrder);
  neoOrder = await getOrder(neoTx);
  console.log("neoOrder = " + neoOrder);
};