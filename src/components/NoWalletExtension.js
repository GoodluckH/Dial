import { Box, useColorModeValue, Spacer, Text, VStack } from "@chakra-ui/react";

export default function NoWalletExtension() {
  return (
    <>
      <Spacer />
      <Box
        maxW="lg"
        borderWidth="2px"
        borderRadius="25"
        overflow="hidden"
        boxShadow="md"
        padding="30px"
        background={useColorModeValue("white", "gray.800")}
      >
        <VStack>
          <Text
            fontSize="xl"
            fontWeight="black"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            No wallet extensions detected in your browser.
          </Text>
          <Text fontSize="md" fontWeight="bold">
            Supported wallet providers are MetaMask, Coinbase, and
            WalletConnect.
          </Text>
          <Spacer />
        </VStack>
      </Box>
    </>
  );
}
