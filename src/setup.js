import KardiaTool from 'kardia-tool';
import Contract from 'kardia-tool/lib/contract';

import kardiaAbi from '../kai/abi';

const KARDIA_ENDPOINT = "http://127.0.0.1:8545";
const KARDIA_CONTRACT_ADDRESS = "0x00000000000000000000000000000000736D6339";
const PRIVATE_KEY = "0x8843ebcb1021b00ae9a644db6617f9c6d870e5fd53624cefe374c1d2d710fd06";
const SET_OWNER = "setOwner";

export const setOwner = async () => {
  try {
    const tool = KardiaTool(KARDIA_ENDPOINT);
    const contract = Contract(tool.Provider, '0x', kardiaAbi);
    let estimatedGas = await contract.methods.setOwner().estimateGas({gas: 5000000}, function(error, gasAmount) {
       if (gasAmount === 5000000) console.log("run out of gas");
    });
    // const invoker = contract.invoke({
    //   params: [],
    //   name: SET_OWNER
    // });
    // let result = await invoke.send(PRIVATE_KEY, KARDIA_CONTRACT_ADDRESS, {
    //   amount: 0,
    //   gas: 2000000,
    //   gasPrice: 90000
    // })
  } catch(e) {
    return Promise.reject({
      error: e.message
    })
  }
};

setOwner().then(function() {
  console.log("done")
}).catch(e => {
  console.log(e);
});