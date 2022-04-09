import './App.css';
import React, { useEffect, useState } from 'react';
import sampleABI from './abi';
import ContractFunctions from './components/ContractFunctions';
import SearchBar from './components/SearchBar';
import { VStack, Container } from '@chakra-ui/react'




const ETHERSCAN_API = process.env.REACT_APP_ETHERSCAN_API
//const etherScanAPIEndPoint = `https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413&apikey=${ETHERSCAN_API}`

function App() {
  // console.log(ETHERSCAN_API);
  const [contractABI, setContractABI] = useState({});
  const [contractItems, setContractItems] = useState([]);
  
/* useEffect(() => {


      var contractABI = sampleABI;
     //let contractABIParsed = JSON.parse(contractABI)
    //  console.log(contractABI)
      setContractABI(contractABI);
      setContractItems(contractABI);




    fetch("https://api.etherscan.io/api?module=contract&action=getabi&address=0xBB9bc244D798123fDe783fCc1C72d3Bb8C189413")
    .then(res => res.json())
    .then(
      (result) => {
        if (!result.hasOwnProperty('result)) {
          //TODO: something wrong with the API 
          return;
        }
        if (result.status === "0" && result.result === "Contract source code not verified" ) {
          //TODO: display the error result
          return;
        }

        var contractABI = sampleABI;
       // contractABI = result.result;
        if (contractABI !== ''){
          let contractABIParsed = JSON.parse(contractABI)
          console.log(contractABI)
          setContractABI(contractABI);
          setContractItems(contractABIParsed);
      } else {
        //TODO: display unable to extract functions
          console.log("Error");
      } 
      },
      (error) => {
        console.log("something went wrong: " + error);
      }

    )
  })  */


  return (
    <div className="App">
      <VStack>
      <Container maxW='md'>
        <SearchBar />
        <ContractFunctions ABI={sampleABI} /> 
      </Container>
      </VStack>

    </div>
  );
}

export default App;
