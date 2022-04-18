import React from "react";
import { Spacer, Image, Text } from "@chakra-ui/react";

function WalletButton({ wallet }) {
  return (
    <>
      <Image
        marginLeft="20%"
        marginRight="5%"
        src={`${wallet}-logo.png`}
        boxSize="40px"
      />
      <Text fontSize="md" fontWeight="bold">
        {wallet}
      </Text>
      <Spacer />
    </>
  );
}

export default WalletButton;
