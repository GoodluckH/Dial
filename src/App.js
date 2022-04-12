import "./App.css";
import React, { useEffect, useState } from "react";
import sampleABI from "./abi";
import ContractFunctions from "./components/ContractFunctions";
import SearchBar from "./components/SearchBar";
import { VStack, Container, Box, Spacer, Flex, Center } from "@chakra-ui/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ETHERSCAN_API = process.env.REACT_APP_ETHERSCAN_API;
//const etherScanAPIEndPoint = `https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=${ETHERSCAN_API}`

function App() {
  // console.log(ETHERSCAN_API);
  const [contractABI, setContractABI] = useState({});
  const [contractItems, setContractItems] = useState([]);
  const [age, setAge] = useState("");
  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const updateContract = (contractABI, contractABIParsed) => {
    setContractABI(contractABI);
    setContractItems(contractABIParsed);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="select-function-input-label">Function</InputLabel>
      <Select
        labelId="select-function-label"
        id="selelct-function"
        value={age}
        label="Function"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default App;
{
  /* <div className="App">
      <VStack minH="100vh">
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
          <ContractFunctions ABI={contractABI} />
          </Box>
        </Container>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
      </VStack>
    </div>  */
}
