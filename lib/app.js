"use strict";

var _tronweb = require("tronweb");

var _tronweb2 = _interopRequireDefault(_tronweb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contractAddress = "413b4c5dfdd72d4795b31c62fc006525d1bb9d85fb";
var privateKey = "b739381ee36be56ac220bfa84a676faf287a4be00ff110b8aad72fd32f4aef56";
var owner = "4171f88d9456825364aebabc4ffa70c1814b26df39";

var tronWeb = new _tronweb2.default("http://127.0.0.1:9090", "http://127.0.0.1:8091", "http://127.0.0.1:9090", privateKey);

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
deposit();
// sendTransaction();