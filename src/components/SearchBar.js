import React, { useState } from "react";
import {
  useToast,
  Input,
  HStack,
  IconButton,
  FormControl,
} from "@chakra-ui/react";
import { useNetwork } from "@thirdweb-dev/react";
import { SearchIcon } from "@chakra-ui/icons";
import Web3 from "web3/dist/web3.min.js";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function getEtherScanAPI(address, network) {
  var endpoint = "";
  if (network[0].data.chain && network[0].data.chain.id === 4) {
    endpoint = `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${
      address.length === 40 ? "0x" + address : address
    }&apikey=${process.env.REACT_APP_ETHERSCAN_API}`;
  } else if (network[0].data.chain && network[0].data.chain.id === 1) {
    endpoint = `https://api.etherscan.io/api?module=contract&action=getabi&address=${
      address.length === 40 ? "0x" + address : address
    }&apikey=${process.env.REACT_APP_ETHERSCAN_API}`;
  }
  console.log("switched to " + network[0].data.chain.id);
  return endpoint;
}

function SearchBar(props) {
  const toast = useToast();
  const placeholderText = "address of a verified cotract";
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const currentNetwork = useNetwork();

  const handleInput = (e) => {
    setAddress(e.target.value);
    console.log(address);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (address.trim() === "") return;
    setLoading(true);
    if (validateAddress()) {
      return fetch(getEtherScanAPI(address, currentNetwork))
        .then((res) => res.json())
        .then(
          (result) => {
            if (!result.hasOwnProperty("result")) {
              //TODO: something wrong with the API
              setLoading(false);
              return;
            }
            if (
              result.status === "0" &&
              result.result === "Contract source code not verified"
            ) {
              //TODO: display the error result

              setLoading(false);
              return;
            }

            var contractABI = result.result;
            if (contractABI !== "") {
              if (address.length === 40) setAddress("0x" + address);
              props.onGettingContractABI(contractABI, address);
            } else {
              //TODO: display unable to extract functions
              console.log("Error");
            }
            setLoading(false);
            return true;
          },
          (error) => {
            console.log("something went wrong: " + error);
            setLoading(false);
            return false;
          }
        );
    } else {
      if (!toast.isActive("addressCheck")) {
        toast({
          id: "addressCheck",
          title: "Invalid Ethereum Address",
          description: "Check your input and try again.",
          status: "error",
          duration: 3000,
          position: "top",
          isClosable: true,
        });
      }
    }
  };
  const validateAddress = () => {
    var cleanAddress = address.trim();
    return web3.utils.isAddress(cleanAddress);
  };

  return (
    <FormControl marginBottom="25px" textColor="blackAlpha.800">
      <form>
        <HStack>
          <Input
            name="searchBar"
            placeholder={placeholderText}
            value={address}
            onChange={handleInput}
          />
          <IconButton
            aria-label="Fetch Contract Methods"
            icon={<SearchIcon />}
            type="submit"
            onClick={handleSubmit}
            isLoading={loading}
            background="gray.300"
          />
        </HStack>
      </form>
    </FormControl>
  );
}

export default SearchBar;
