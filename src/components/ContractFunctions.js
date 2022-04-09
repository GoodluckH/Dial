import React from "react";
import { Text, VStack } from "@chakra-ui/react";

/// Get all functions from a parsed ABI
function ContractFunctions(props) {
  // console.log(props.ABI);
  var parsed = JSON.parse(props.ABI);
  console.log(parsed);
  var functions = parsed.filter((item) => item.type === "function");
  for (var item of functions) {
    console.log(item);
  }
  return (
    <div>
      {functions.map((item, i) => {
        return (
          <VStack key={i}>
            <Text fontSize="3xl">{item.name}</Text>
            <p>Inputs: {item.inputs.toString()}</p>
            <p>Outputs: {item.inputs.toString()}</p>
          </VStack>
        );
      })}
    </div>
  );
}

export default ContractFunctions;
