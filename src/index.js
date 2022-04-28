import { React } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const root = createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <ThirdwebProvider desiredChainId={ChainId.Mainnet}>
      <App />
      {/*  <Test /> */}
    </ThirdwebProvider>
  </ChakraProvider>
);
