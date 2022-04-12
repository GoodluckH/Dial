import React, { useState } from "react";
import {
  useToast,
  Input,
  HStack,
  IconButton,
  FormControl,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Web3 from "web3/dist/web3.min.js";
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

function SearchBar(props) {
  const toast = useToast();
  const placeholderText = "address of a verified cotract";
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    setAddress(e.target.value);
    console.log(address);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAddress()) {
      console.log("hello");
      console.log(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${
          address.length === 40 ? "0x" + address : address
        }&apikey=${process.env.REACT_APP_ETHERSCAN_API}`
      );
      setLoading(true);
      return fetch(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${
          address.length === 40 ? "0x" + address : address
        }&apikey=${process.env.REACT_APP_ETHERSCAN_API}`
      )
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
              let contractABIParsed = JSON.parse(contractABI);
              // console.log(contractABI);
              props.onGettingContractABI(contractABI, contractABIParsed);
            } else {
              //TODO: display unable to extract functions
              console.log("Error");
            }
            setLoading(false);
          },
          (error) => {
            console.log("something went wrong: " + error);
            setLoading(false);
          }
        );
    } else if (address === "") return;
    else {
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
    <FormControl>
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
          />
        </HStack>
      </form>
    </FormControl>
  );
}

export default SearchBar;
