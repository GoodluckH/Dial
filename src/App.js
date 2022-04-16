import "./App.css";
import React, { useEffect, useState } from "react";
import ContractFunctions from "./components/ContractFunctions";
import SearchBar from "./components/SearchBar";
import { VStack, Container, Box, Spacer } from "@chakra-ui/react";
import { ConnectWallet } from "./components/ConnectWallet";

function App() {
  const [contractABI, setContractABI] = useState({});
  const [contractAddress, setContractAddress] = useState("");

  const updateContract = (contractABI, contractAddress) => {
    setContractABI(contractABI);
    setContractAddress(contractAddress);
  };

  return (
    <div className="App">
      <VStack minH="100vh">
        <ConnectWallet />
        <Spacer />
        <Container maxW="lg" h="vh">
          <Box
            maxW="lg"
            borderWidth="2px"
            borderRadius="25"
            overflow="hidden"
            boxShadow="md"
            minH="200px"
            padding="20px"
          >
            <SearchBar onGettingContractABI={updateContract} />
            <ContractFunctions
              ABI={contractABI}
              contractAddress={contractAddress}
            />
          </Box>
        </Container>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
      </VStack>
    </div>
  );
}

export default App;
