'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInvokeScript = undefined;

var _neonJs = require('@cityofzion/neon-js');

var _setup = require('./setup');

var getInvokeScript = exports.getInvokeScript = async function getInvokeScript(rqBody, endpoint) {
  var queryResult = await _neonJs.rpc.queryRPC(endpoint, rqBody);
  if (queryResult.result && queryResult.result.state && queryResult.result.state.includes('BREAK')) {
    return queryResult.result;
  }
  return '';
};

exports.default = async function (amount, receiver) {

  if (amount === 0) {
    return Promise.reject({
      payload: "amount must be integer and greater than 0"
    });
  }

  var rpcEndpoint = _setup.NEO_HOST;

  var account = new _neonJs.wallet.Account(_setup.NEO_PRIVATE_KEY);
  var rqBody = {
    method: "invoke",
    params: [_setup.NEO_CONTRACT_HASH, [{
      "type": "String",
      "value": "deposit"
    }, {
      "type": "Array",
      "value": [{
        "type": "String",
        "value": "TRX"
      }, {
        "type": "String",
        "value": receiver
      }]

    }]]
  };
  var result = await getInvokeScript(rqBody, rpcEndpoint);
  if (result === '') {
    return Promise.reject({
      payload: 'failed on getting invoke script'
    });
  }

  var intents = _neonJs.api.makeIntent({
    "NEO": new _neonJs.u.Fixed8(amount)
  }, _setup.NEO_CONTRACT_HASH);

  var apiProvider = new _neonJs.api.neoscan.instance(_setup.NEO_SCAN);
  try {
    return await _neonJs.api.doInvoke({
      api: apiProvider,
      url: rpcEndpoint,
      intents: intents,
      script: result.script,
      account: account,
      gas: Math.ceil(result.gas_consumed),
      override: {
        attributes: [{
          data: _neonJs.u.hash160(_neonJs.wallet.getVerificationScriptFromPublicKey(account.publicKey)),
          usage: _neonJs.tx.TxAttrUsage.Script
        }, {
          data: Date.now().toString() + Math.floor(Math.random() * Math.floor(9)).toString(),
          usage: _neonJs.tx.TxAttrUsage.Remark
        }]
      }
    });
  } catch (invokeErr) {
    console.log('invokeErr ' + invokeErr.message);
    return Promise.reject({
      error: invokeErr.message
    });
  }
};