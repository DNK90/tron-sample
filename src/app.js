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

const callBack = (msg) => {
  console.log(msg);
};

const freezeEnergy = () => {
  tronWeb.trx.freezeBalance(tronWeb.toSun(5000), 3, "ENERGY", privateKey)
};

const freezeBandwidth = () => {
  tronWeb.trx.freezeBalance(tronWeb.toSun(5000), 3, "BANDWIDTH", privateKey)
};

const sendTransaction = async () => {
  await tronWeb.trx.sendTransaction(
    "TJN393PW632cEfpycTPUsL8kpkTJfxLo8Z",
    Math.pow(10, 6),
    privateKey,
  );
};

const deposit = () => {
  tronWeb.contract().at(contractAddress).then((exchange) => {
    exchange.deposit("0xff6781f2cc6F9b6b4A68A0AfC3AaE89133BbB236", "ETH-TRX").send({
        feeLimit: 100000000,
        callValue: Math.pow(10, 10)
      },
      privateKey
    );
  }).catch((e) => console.log(e));
};

const release = () => {
  tronWeb.contract().at(contractAddress).then((contract) => {
    contract.release("TMm48VEk8foxwo5656DsAS58WKtgV7fYtH", Math.pow(10,7)).send({
      feeLimit: 100000000,
    }, privateKey)
  });
};

// freezeEnergy();
// freezeBandwidth
// release();
// deposit();
// sendTransaction();

