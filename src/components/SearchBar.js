import React, { useState } from "react";
import { Input, HStack, IconButton, FormControl } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchBar() {
  const placeholderText = "address of a verified cotract";
  const [address, setAddress] = useState("");

  const handleInput = (e) => setAddress(e.target.value);
  const handleSubmit = () => {
    console.log("hi");
  };
  return (
    <HStack>
      <FormControl onSubmit={handleSubmit}>
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
          onSubmit={handleSubmit}
        />
      </FormControl>
    </HStack>
  );
}

function getFormattedAddressFrom(address) {
  var cleanAddress = address.trim();

  if (cleanAddress.slice(0, 2) !== "0x") {
    if (cleanAddress.length !== 40) {
      return false;
    } else {
      return "0x" + cleanAddress;
    }
  } else if (cleanAddress.length !== 42) return false;
}

export default SearchBar;
