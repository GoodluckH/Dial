import React from "react";
import {
  Box,
  Flex,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import WalletInfo from "./WalletInfo";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box position="fixed" w="100%" zIndex="sticky">
        <Flex
          as={"header"}
          h={14}
          alignItems={"center"}
          justifyContent={"space-between"}
          zIndex="999"
          top="0"
          minH={"60px"}
          w={"full"}
          css={{
            backdropFilter: "saturate(180%) blur(5px)",
            backgroundColor: useColorModeValue(
              "rgba(255, 255, 255, 0.8)",
              "rgba(26, 32, 44, 0.8)"
            ),
          }}
        >
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Box />
              <Box>Logo</Box>
            </Stack>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <WalletInfo />
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Box />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
