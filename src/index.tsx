import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  </React.StrictMode>
);
