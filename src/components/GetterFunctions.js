import React from "react";
import { Text } from "@chakra-ui/react";
import FunctionButton from "./FunctionButton";

function GetterFunctions({ functions, ABI, contractAddress }) {
  if (functions.length === 0) return;
  return (
    <>
      <Text fontWeight="bold" fontSize="lg">
        👀 Getter Functions
      </Text>
      {functions.map((item, i) => {
        return (
          <FunctionButton
            key={i}
            func={item}
            ABI={ABI}
            contractAddress={contractAddress}
          />
        );
      })}
    </>
  );
}

export default GetterFunctions;
