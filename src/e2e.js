import TronWeb from "tronweb";
import {invoke, delay, TRX_RECEIVER} from "./setup";
import depositNEO from "./neo";
const contractAddress = "41d69c86eeaa2c1ea0e2db91a64c2ed5814ec66470";
const privateKey = "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";
const owner = "41928c9af0651632157ef27a2cf17ca72c575a4d21";

const GET_ORDER_BY_ID = "getOrderByTxIdPublic";

const tronWeb = new TronWeb(
  "http://35.198.253.44:9090",
  "http://35.240.187.29:18191",
  "http://35.198.253.44:9090",
  privateKey,
);

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

const depositTRX = async () => {
  const exchange = await tronWeb.contract().at(contractAddress);
  return await exchange.deposit("AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y", "NEO").send({
      feeLimit: 100000000,
      callValue: 391173315,
      privateKey: privateKey
    },
  );
};

const getOrder = async (tx_id) => {
  let count = 0;
  while(count < 10) {
    const orders = await invoke(GET_ORDER_BY_ID, [tx_id], false);
    console.log(`result: ${orders}`);
    if (orders || orders.length > 0) {
      return orders;
    }
    count++;
    await delay(5000);
  }
  return false;
};

// test does e2e testing
export const test = async () => {
  console.log("depositing TRX");
  let tronTx = await depositTRX();
  console.log(tronTx);

  // get pending orders
  let trxOrder = await getOrder(tronTx);
  if (!trxOrder) return false;

  console.log(trxOrder);
  console.log("depositing NEO");

  // deposit 1 NEO
  let neoTx = await depositNEO(1, TRX_RECEIVER);
  console.log(neoTx);

  let neoOrder = await getOrder(neoTx);
  if (!neoOrder) return false;
  console.lg(neoOrder);

  // delay to make 2 orders match to each other then get order again to see all txs are fulfilled or not.
  delay(10000);

  trxOrder = await getOrder(tronTx);
  console.log(`trxOrder = ${trxOrder}`);
  neoOrder = await getOrder(neoTx);
  console.log(`neoOrder = ${neoOrder}`);
};