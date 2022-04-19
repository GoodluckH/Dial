import React, { useEffect, useState } from "react";
import { Text, HStack, Button, useToast, Spacer, Box } from "@chakra-ui/react";
import process from "process";
import { ethers } from "ethers";
import formatResonse from "../helpers/formatResponse";
import TypeTags from "./TypeTags";
window.process = process;

function FunctionButton({ func, ABI, contractAddress, isGetter }) {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  var provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const callGetterFunction = async () => {
    if (response.length !== 0) {
      setResponse([]);
      return;
    }
    setLoading(true);
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    await contract[func.name + "()"]().then(
      (value) => {
        setResponse(formatResonse(value));
      },
      (error) => {
        const errorJSON = JSON.stringify(error);
        const parsedError = JSON.parse(errorJSON);
        console.log(parsedError);

        toast({
          id: "genericError",
          title: "Chain Change Detected",
          description: `Refresh and try again. Make sure your wallet is connected to the correct chain`,
          status: "warning",
          duration: 4000,
          position: "top",
          isClosable: true,
        });
      }
    );

    setLoading(false);
  };

  if (isGetter) {
    return (
      <>
        <Button
          justifyContent="space-between"
          isLoading={loading}
          size="md"
          height="50px"
          width="100%"
          borderRadius="10"
          borderColor="gray.100"
          bg="gray.100"
          shadow="base"
          onClick={callGetterFunction}
        >
          <Text>{func.name}</Text>
          <HStack>
            {func.outputs.length !== 0 && <TypeTags outputs={func.outputs} />}
          </HStack>
        </Button>
        {response.length !== 0 &&
          response.map((value, i) => {
            return (
              <Text key={i} marginBottom="200px">
                {value}
              </Text>
            );
          })}
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
