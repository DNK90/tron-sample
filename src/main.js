import {test} from "./e2e";
import {setup} from "./setup";

const command = process.argv[2];
switch (command) {
  case "e2e":
    test().then(function(msg) {
      console.log(msg);
    }).catch(e => {
      console.log(e);
    }); break;
  case "setup":
    setup().then(function(msg) {
      console.log(msg);
    }).catch(e => {
      console.log(e);
    });break;
  default:
    console.log("command not found");
}