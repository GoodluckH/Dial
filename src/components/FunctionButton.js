import React, { useState } from "react";
import {
  Text,
  HStack,
  Button,
  useToast,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import process from "process";
import { ethers } from "ethers";
import formatResonse from "../helpers/formatResponse";
import TypeTags from "./TypeTags";
window.process = process;

function FunctionButton({ func, ABI, contractAddress }) {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);

  var provider = new ethers.providers.Web3Provider(window.ethereum);
  // const signer = provider.getSigner();

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
        if (parsedError.data !== undefined && parsedError.data === "0x") {
          if (!toast.isActive("isAccount")) {
            toast({
              id: "isAccount",
              title: "Not a Smart Contract",
              description: `The address you put in is not a Smart Contract; it's likely an account address`,
              status: "warning",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }
        } else {
          if (!toast.isActive("genericError")) {
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
        }
      }
    );

    setLoading(false);
  };

  return (
    <>
      <Button
        justifyContent="space-between"
        isLoading={loading}
        size="md"
        height="50px"
        width="100%"
        sx={
          response.length === 0
            ? { borderRadius: "10px" }
            : { borderRadius: "10px 10px 0 0" }
        }
        borderColor="gray.100"
        bg={useColorModeValue("gray.100", "gray.600")}
        shadow="base"
        marginBottom={3}
        onClick={callGetterFunction}
      >
        <Text>{func.name}</Text>
        <HStack>
          {func.outputs.length !== 0 && <TypeTags outputs={func.outputs} />}
        </HStack>
      </Button>
      <Box
        bg={useColorModeValue("gray.200", "gray.500")}
        height={12}
        marginTop={-3}
        borderColor="gray.100"
        padding={3}
        marginBottom={3}
        sx={{ borderRadius: "0 0 10px 10px" }}
        hidden={response.length === 0}
      >
        {response.length !== 0 &&
          response.map((value, i) => {
            return <Text key={i}>{value}</Text>;
          })}
      </Box>
    </>
  );

  /*   return (
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
  ); */
}

export default FunctionButton;
