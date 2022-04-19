import {
  Box,
  Button,
  useColorModeValue,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useAddress,
} from "@thirdweb-dev/react";
import WalletButton from "./WalletButton";

export const ConnectWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const address = useAddress();

  return (
    <>
      <Spacer />
      <Box
        maxW="lg"
        borderWidth="2px"
        borderRadius="25"
        overflow="hidden"
        boxShadow="md"
        minH="200px"
        padding="30px"
        hidden={address}
        background={useColorModeValue("white", "gray.800")}
      >
        <VStack>
          <Text
            fontSize="xl"
            fontWeight="black"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            Connect your wallet to get started!
          </Text>
          <Spacer />
          <Button
            width="85%"
            minH="60px"
            onClick={() => connectWithCoinbaseWallet()}
            justifyContent="flex-start"
          >
            <WalletButton wallet="Coinbase" />
          </Button>

          <Button width="85%" minH="60px" onClick={() => connectWithMetamask()}>
            <WalletButton wallet="MetaMask" />
          </Button>
          <Button
            width="85%"
            minH="60px"
            onClick={() => connectWithWalletConnect()}
          >
            <WalletButton wallet="WalletConnect" />
          </Button>
        </VStack>
      </Box>
    </>
  );
};
