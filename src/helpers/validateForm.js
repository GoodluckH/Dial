import BigNumber from "bignumber.js";
export default function validateForm(userInputs, types) {
  var ans = [];
  for (var i = 0; i < userInputs.length; i++) {
    if (types[i].slice(types[i].length - 2) === "[]") {
      if (types[i].slice(0, 4) === "uint" || types[i].slice(0, 3) === "int") {
        var parsedInput = JSON.parse(userInputs[i]);
        // var resultAddressArray = userInputs[i]
        //   .slice(1, userInputs[i].length - 1)
        //   .split(",");
        // resultAddressArray = resultAddressArray.map((x) => x.trim());
        // console.log(resultAddressArray);
        ans.push(
          parsedInput.map((item) => {
            return new BigNumber(item);
          })
        );
      } else if (types[i].slice(0, 7) === "address") {
        var resultAddressArray = userInputs[i];
        //   .slice(1, userInputs[i].length - 1)
        //   .split(",");
        // resultAddressArray = resultAddressArray.map((x) => x.trim());
        /// TODO
        //  const abi = ethers.utils.defaultAbiCoder;
        // const params = abi.encode(
        //   ["address[]"], // encode as address array
        //   [resultAddressArray]
        // );

        ans.push(resultAddressArray);
      } else {
        ans.push(userInputs[i]);
      }
    } else {
      ans.push(userInputs[i]);
    }
  }
  return ans;
}
