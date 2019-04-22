import TronWeb from "tronweb";

const contractAddress = "41d69c86eeaa2c1ea0e2db91a64c2ed5814ec66470";
const privateKey = "da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0";
const owner = "41928c9af0651632157ef27a2cf17ca72c575a4d21";

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

const deposit = () => {
  tronWeb.contract().at(contractAddress).then((exchange) => {
    exchange.deposit("AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y", "NEO").send({
        feeLimit: 100000000,
        callValue: 391173315,
        privateKey: privateKey
      },
    ).then((tx_id) => {
      console.log(tx_id);

    });
  }).catch((e) => console.log(e));
};

deposit();