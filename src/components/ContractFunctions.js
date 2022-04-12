import React, { useState } from "react";
import { Text, VStack } from "@chakra-ui/react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

/// Get all functions from a parsed ABI
function ContractFunctions(props) {
  console.log(props.ABI);
  const [contractFunc, setContractFunc] = useState({});
  const [age, setAge] = useState("");
  const handleChange = (e) => {
    setAge(e.target.value);
  };

  //  if (Object.keys(props.ABI).length === 0) return;
  // var parsed = JSON.parse(props.ABI);
  // var functions = parsed.filter((item) => item.type === "function");

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
        {/*     {functions.map((item, i) => {
          return <MenuItem value={i}>{item.name}</MenuItem>;
        })} */}
      </Select>
    </FormControl>
  );
}

export default ContractFunctions;
