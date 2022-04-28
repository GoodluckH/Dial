import "./App.css";
import React, { useState } from "react";

import {
  VStack,
  Container,
  Box,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";

import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar";
import NoWalletExtension from "./components/NoWalletExtension";
import ConnectWallet from "./components/ConnectWallet";
import ContractFunctions from "./components/ContractFunctions";

function App() {
  const [contractABI, setContractABI] = useState({});
  const [contractAddress, setContractAddress] = useState("");
  const updateContract = (contractABI, contractAddress) => {
    setContractABI(contractABI);
    setContractAddress(contractAddress);
  };

  const address = useAddress();

  return (
    <div className="App">
      <NavBar address={address} />
      <VStack
        minH="100vh"
        background={useColorModeValue("gray.100", "gray.700")}
      >
        {window.ethereum && <ConnectWallet />}
        {!window.ethereum && <NoWalletExtension />}
        <Container maxW="lg" h="vh" hidden={!address}>
          <Box
            maxW="lg"
            borderWidth="3px"
            borderRadius="25"
            borderColor={useColorModeValue("gray.200", "gray.900")}
            overflow="hidden"
            boxShadow="md"
            minH="10px"
            background={useColorModeValue("white", "gray.800")}
            padding="25px"
            marginTop={69}
          >
            <SearchBar onGettingContractABI={updateContract} />

            <ContractFunctions
              ABI={contractABI}
              contractAddress={contractAddress}
            />
          </Box>

          <Spacer />
        </Container>
        <Spacer />
        <Spacer />
        <Spacer />
      </VStack>
    </div>
  );
}

export default App;
