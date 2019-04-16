import TronWeb from "tronweb";

const contractAddress = "413b4c5dfdd72d4795b31c62fc006525d1bb9d85fb";
const privateKey = "9102fb099738a6c49192ab1bd3b765f3129c831a99db99cd780eb8856ff47c74";
const owner = "4171f88d9456825364aebabc4ffa70c1814b26df39";

const tronWeb = new TronWeb(
  "http://127.0.0.1:9090",
  "http://127.0.0.1:8091",
  "http://127.0.0.1:9090",
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
deposit();
// sendTransaction();

