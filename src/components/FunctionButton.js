import React, { useState } from "react";
import { Text, Button } from "@chakra-ui/react";
import Web3 from "web3";
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

function FunctionButton({ func, ABI, contractAddress }) {
  const [loading, setLoading] = useState(false);

  const callContractFunction = async () => {
    setLoading(true);
    //const contract = new web3.eth.Contract(ABI);
    await setTimeout(() => setLoading(false), 1000);
  };

  if (func.hasOwnProperty("inputs") && func.inputs.length === 0) {
    return (
      <>
        <Button
          isLoading={loading}
          size="md"
          height="48px"
          width="400px"
          border="2px"
          borderColor="red.500"
          shadow="md"
          onClick={callContractFunction}
        >
          {func.name}
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        isLoading={loading}
        size="md"
        height="48px"
        width="400px"
        border="2px"
        borderColor="green.500"
      >
        {func.name}
      </Button>
    </>
  );
}

export default FunctionButton;
