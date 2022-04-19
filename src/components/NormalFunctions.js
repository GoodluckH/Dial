import React from "react";
import { Text } from "@chakra-ui/react";
import FunctionButton from "./FunctionButton";

function NormalFunctions({ functions, ABI, contractAddress }) {
  if (functions.length === 0) return;
  return (
    <>
      <Text fontWeight="bold" fontSize="lg">
        Normal Functions
      </Text>
      {functions.map((item, i) => {
        return (
          <FunctionButton
            key={i}
            func={item}
            ABI={ABI}
            contractAddress={contractAddress}
            isGetter={false}
          />
        );
      })}
    </>
  );
}

export default NormalFunctions;
