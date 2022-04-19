import {
  MenuItem,
  Menu,
  MenuList,
  MenuButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";

export default function WalletInfo() {
  const address = useAddress();
  const disconnect = useDisconnect();

  if (!address) return;

  return (
    <Menu>
      <MenuButton
        as={Button}
        borderColor="gray.100"
        borderWidth={1}
        borderRadius={25}
        minW={0}
      >
        {address.slice(0, 8)}
      </MenuButton>
      <MenuList alignItems={"center"}>
        <MenuItem textColor="red" onClick={disconnect}>
          <Text fontWeight="bold">Disconnect</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
