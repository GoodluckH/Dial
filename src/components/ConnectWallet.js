import { Box, Button, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from "@thirdweb-dev/react";
import WalletButton from "./WalletButton";

export const ConnectWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  // If a wallet is connected, show address, chainId and disconnect button
  if (address) {
    return (
      <div>
        Address: {address}
        <br />
        Chain ID: {network[0].data.chain && network[0].data.chain.id}
        <br />
        <button onClick={disconnectWallet}>Disconnect</button>
      </div>
    );
  }

  // If no wallet is connected, show connect wallet options
  return (
    <Box
      maxW="lg"
      borderWidth="2px"
      borderRadius="25"
      overflow="hidden"
      boxShadow="md"
      minH="200px"
      padding="30px"
      background="white"
    >
      <VStack>
        <Text fontSize="xl" fontWeight="black">
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
  );
};
