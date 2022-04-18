import "./App.css";
import React, { useEffect, useState } from "react";
import ContractFunctions from "./components/ContractFunctions";
import SearchBar from "./components/SearchBar";
import { VStack, Container, Box, Spacer } from "@chakra-ui/react";
import { ConnectWallet } from "./components/ConnectWallet";
import { useAddress } from "@thirdweb-dev/react";

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
      <VStack minH="100vh" background="gray.100">
        {!address && <Spacer /> && <Spacer /> && <Spacer />}
        <Container maxW="lg" h="vh">
          <ConnectWallet />
          <Spacer />
          {address && (
            <Box
              maxW="lg"
              borderWidth="2px"
              borderRadius="25"
              overflow="hidden"
              boxShadow="md"
              minH="200px"
              padding="25px"
              background="white"
            >
              <SearchBar onGettingContractABI={updateContract} />
              <ContractFunctions
                ABI={contractABI}
                contractAddress={contractAddress}
              />
            </Box>
          )}
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
