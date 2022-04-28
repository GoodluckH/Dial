import { ethers } from "ethers";

function formatResonse() {
  var response = [];
  for (var i = 0; i < arguments.length; i++) {
    const value = arguments[i];
    response.push(convert(value));
  }
  return response;
}

export default formatResonse;

function convert(value) {
  const type = value.constructor.name;

  if (type === "BigNumber") {
    const valueInEther = ethers.utils.formatEther(value);
    return valueInEther.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1,");
  }
  if (type === "Array") return "[" + value.toString() + "]";
  return value.toString();
}
