import React from "react";
import { Text, Tooltip } from "@chakra-ui/react";
import { QuestionIcon, Icon } from "@chakra-ui/icons";
import FunctionButton from "./FunctionButton";

function GetterFunctions({ functions, ABI, contractAddress }) {
  if (functions.length === 0) return;
  return (
    <>
      <Text fontWeight="bold" fontSize="lg">
        👀 Getter Functions{" "}
        <Tooltip
          fontSize="sm"
          label='Smart Contract functions that are read-only (marked as "view" or "pure"). Calling these functions does not cost gas 🥳'
        >
          <Icon as={QuestionIcon} w={4} h={4} color="gray.500" />
        </Tooltip>
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
