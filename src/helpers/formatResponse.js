function formatResonse() {
  var response = [];
  for (var i = 0; i < arguments.length; i++) {
    const value = arguments[i];
    // console.log(convert(value));
    response.push(convert(value));
    console.log(`${value.constructor.name}: ${convert(value)}`);
  }
  return response;
}

export default formatResonse;

function convert(value) {
  const type = value.constructor.name;

  if (type === "BigNumber") return value.toNumber();
  if (type === "Array") return "[" + value.toString() + "]";
  return value.toString();
}
