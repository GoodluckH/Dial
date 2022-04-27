import React, { useState } from "react";
import {
  Text,
  HStack,
  Button,
  useToast,
  useColorModeValue,
  Box,
  FormControl,
  Input,
} from "@chakra-ui/react";
import process from "process";
import { ethers } from "ethers";
import formatResonse from "../helpers/formatResponse";
import TypeTags from "./TypeTags";
import getArgumentTypes from "../helpers/getArgumentTypes";
import validateForm from "../helpers/validateForm";
import { wait } from "@testing-library/user-event/dist/utils";
window.process = process;

function FunctionButton({ func, ABI, contractAddress, isGetter }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userInputs, setUserInputs] = useState(
    func.inputs.length === 0 ? [] : new Array(func.inputs.length)
  );

  var provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const openOrCollapse = () => {
    if (response.length !== 0) {
      setResponse([]);
      setShowForm(false);
    } else {
      setShowForm(!showForm);
    }
  };

  const callGetterFunction = async () => {
    if (response.length !== 0) {
      setResponse([]);
      setShowForm(false);
      return;
    }
    if (func.inputs.length !== 0 && !showForm) {
      setShowForm(true);
      return;
    }

    setLoading(true);
    const contract = new ethers.Contract(
      contractAddress,
      ABI,
      isGetter ? provider : signer
    );
    const argumentTypes = getArgumentTypes(func.inputs);
    setUserInputs(
      validateForm(
        userInputs,
        func.inputs.map((x) => x.type)
      )
    );

    if (!isGetter) {
      const transaction = await contract[
        func.name + `(${argumentTypes.toString()})`
      ](...userInputs);
      await wait(transaction).then((value) => console.log(value));
    } else {
      await contract[func.name + `(${argumentTypes.toString()})`](
        ...userInputs
      ).then(
        (value) => {
          setResponse(formatResonse(value));
          setShowForm(false);
        },
        (error) => {
          const errorJSON = JSON.stringify(error);
          const parsedError = JSON.parse(errorJSON);
          console.log(parsedError);

          if (!toast.isActive("generic")) {
            var addressArrayError = func.inputs
              .map((x) => x.type)
              .includes("address[]")
              ? " || Argument type 'address[]' is not supported at the moment 😔 "
              : "";

            toast({
              id: "generic",
              title: "Something Went Wrong",
              description:
                `${
                  parsedError.reason === undefined
                    ? parsedError.message
                    : parsedError.reason
                }` + addressArrayError,
              status: "warning",
              duration: 5000,
              position: "top",
              isClosable: true,
            });
          }
        }
      );
    }

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
          (response.length === 0) ^ showForm
            ? { borderRadius: "10px" }
            : { borderRadius: "10px 10px 0 0" }
        }
        borderColor="gray.100"
        bg={useColorModeValue("gray.100", "gray.600")}
        shadow="base"
        marginBottom={3}
        onClick={func.inputs.length > 0 ? openOrCollapse : callGetterFunction}
      >
        <Text>{func.name}</Text>
        <HStack>
          {func.outputs.length !== 0 && <TypeTags outputs={func.outputs} />}
        </HStack>
      </Button>
      <Box
        bg={useColorModeValue("gray.200", "gray.500")}
        marginTop={-3}
        borderColor="gray.100"
        padding={3}
        marginBottom={3}
        sx={{ borderRadius: "0 0 10px 10px" }}
        hidden={!showForm}
      >
        {func.inputs.map((arg, i) => (
          <FormControl isRequired key={i}>
            <Input
              marginBottom={2}
              _light={{ bg: "gray.50" }}
              _dark={{ bg: "gray.700" }}
              placeholder={`${arg.name} (${arg.type})`}
              onChange={(e) => {
                userInputs[i] = e.target.value;
                setUserInputs(userInputs);
              }}
            />
          </FormControl>
        ))}
        <Button
          margin={1}
          _light={{ bg: "gray.50" }}
          _dark={{ bg: "gray.600" }}
          _hover={{ bg: "gray.200" }}
          onClick={callGetterFunction}
        >
          Call
        </Button>
      </Box>
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
        {response.map((value, i) => {
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
