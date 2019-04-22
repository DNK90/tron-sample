"use strict";

var _tronweb = require("tronweb");

var _tronweb2 = _interopRequireDefault(_tronweb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractAddress = "41d69c86eeaa2c1ea0e2db91a64c2ed5814ec66470";
var privateKey = "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";
var owner = "41928c9af0651632157ef27a2cf17ca72c575a4d21";

var tronWeb = new _tronweb2.default("http://35.198.253.44:9090", "http://35.240.187.29:18191", "http://35.198.253.44:9090", privateKey);

var callBack = function callBack(msg) {
  console.log(msg);
};

var freezeEnergy = function freezeEnergy() {
  tronWeb.trx.freezeBalance(tronWeb.toSun(5000), 3, "ENERGY", privateKey);
};

var freezeBandwidth = function freezeBandwidth() {
  tronWeb.trx.freezeBalance(tronWeb.toSun(5000), 3, "BANDWIDTH", privateKey);
};

var sendTransaction = async function sendTransaction() {
  await tronWeb.trx.sendTransaction("TJN393PW632cEfpycTPUsL8kpkTJfxLo8Z", Math.pow(10, 6), privateKey);
};

var deposit = function deposit() {
  tronWeb.contract().at(contractAddress).then(function (exchange) {
    exchange.deposit("0xff6781f2cc6F9b6b4A68A0AfC3AaE89133BbB236", "ETH-TRX").send({
      feeLimit: 100000000,
      callValue: Math.pow(10, 10)
    }, privateKey);
  }).catch(function (e) {
    return console.log(e);
  });
};

var release = function release() {
  tronWeb.contract().at(contractAddress).then(function (contract) {
    contract.release("TMm48VEk8foxwo5656DsAS58WKtgV7fYtH", Math.pow(10, 7)).send({
      feeLimit: 100000000
    }, privateKey);
  });
};

// freezeEnergy();
// freezeBandwidth
// release();
// deposit();
// sendTransaction();