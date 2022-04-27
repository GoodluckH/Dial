import { Box, Text } from "@chakra-ui/react";
import React from "react";

function TypeTags({ outputs }) {
  var validOutputs = outputs.filter((item) => item.type !== undefined);
  var types = validOutputs.map((output) => output.type);
  return (
    <>
      {types.map((type, i) => (
        <Box key={i} background={getColor(type)} p="5px" borderRadius={10}>
          <Text fontSize="12px">{type}</Text>
        </Box>
      ))}
    </>
  );
}

function getColor(type) {
  if (type.slice(type.length - 2) !== "[]") {
    if (type.slice(0, 4) === "uint") return "blue.300";
    if (type.slice(0, 3) === "int") return "red";
    if (type === "bool") return "green.400";
    if (type === "address") return "yellow.500";
    if (type.slice(0, 4) === "byte") return "purple";
    if (type === "string") return "gray";
  } else {
    return "orange";
  }
}

export default TypeTags;
