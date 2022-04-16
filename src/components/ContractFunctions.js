import React from "react";
import { VStack } from "@chakra-ui/react";
import GetterFunctions from "./GetterFunctions";
import NormalFunctions from "./NormalFunctions";

/// Get all functions from a parsed ABI
function ContractFunctions({ ABI, contractAddress }) {
  if (Object.keys(ABI).length === 0) return;
  var parsed = JSON.parse(ABI);

  var functions = parsed.filter((item) => item.type === "function");
  var getterFunctions = functions.filter((item) => item.inputs.length === 0);
  var normalFunctions = functions.filter((item) => item.inputs.length !== 0);

  return (
    <VStack>
      <GetterFunctions
        functions={getterFunctions}
        ABI={ABI}
        contractAddress={contractAddress}
      />
      <NormalFunctions
        functions={normalFunctions}
        ABI={ABI}
        contractAddress={contractAddress}
      />
    </VStack>
  );
}

export default ContractFunctions;
