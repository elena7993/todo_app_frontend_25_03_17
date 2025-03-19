import {
  Box,
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import livingDead from "../imgs/living-dead.png";

import React from "react";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box
      maxW={"450px"}
      w={"100%"}
      margin={"0 auto"}
      bgColor={"white"}
      minH={"100vh"}
      h={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"70px"}
    >
      <Text fontSize={"55px"} fontWeight={"bold"}>
        Login
      </Text>

      <Image w={"35%"} h={"35%"} src={livingDead}></Image>

      <Box display={"flex"} flexDirection={"column"} justifyItems={"center"}>
        <Box marginBottom={"30px"}>
          <Input placeholder="Enter ID" marginBottom={"10px"}></Input>

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button bgColor={"#000"} color={"#fff"} colorScheme={"green"}>
          Login
        </Button>
        <Text marginTop={"5px"} fontSize={"14px"}>
          Click here for Sign up
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
