import { wallet, rpc, tx, api, u } from '@cityofzion/neon-js';
import {NEO_CONTRACT_HASH, NEO_HOST, NEO_PRIVATE_KEY, NEO_SCAN} from "./setup";

export const getInvokeScript = async (rqBody, endpoint) => {
  const queryResult = await rpc.queryRPC(endpoint, rqBody);
  if (queryResult.result && queryResult.result.state && queryResult.result.state.includes('BREAK')) {
    return queryResult.result;
  }
  return '';
};

export default async (amount, receiver) => {

  if (amount === 0) {
    return Promise.reject({
      payload: "amount must be integer and greater than 0"
    })
  }

  const rpcEndpoint = NEO_HOST;

  const account = new wallet.Account(NEO_PRIVATE_KEY);
  const rqBody = {
    method: "invoke",
    params: [
      NEO_CONTRACT_HASH,
      [
        {
          "type": "String",
          "value": "deposit"
        },
        {
          "type": "Array",
          "value": [
            {
              "type": "String",
              "value": "TRX"
            },
            {
              "type": "String",
              "value": receiver
            }
          ]

        }
      ]
    ]
  };
  const result = await getInvokeScript(rqBody, rpcEndpoint);
  if (result === '') {
    return Promise.reject({
      payload: 'failed on getting invoke script'
    })
  }

  const intents = api.makeIntent({
    "NEO": new u.Fixed8(amount),
  }, NEO_CONTRACT_HASH);

  let apiProvider = new api.neoscan.instance(NEO_SCAN);
  try {
    return await api.doInvoke({
      api: apiProvider,
      url: rpcEndpoint,
      intents: intents,
      script: result.script,
      account: account,
      gas: Math.ceil(result.gas_consumed),
      override: {
        attributes: [
          {
            data: u.hash160(wallet.getVerificationScriptFromPublicKey(account.publicKey)),
            usage: tx.TxAttrUsage.Script
          },
          {
            data: Date.now().toString() + (Math.floor(Math.random() * Math.floor(9))).toString(),
            usage: tx.TxAttrUsage.Remark
          }
        ]
      }
    });
  } catch(invokeErr) {
    console.log(`invokeErr ${invokeErr.message}`);
    return Promise.reject({
      error: invokeErr.message
    })
  }
};