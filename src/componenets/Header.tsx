import { Avatar, Box, Text, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";

const Header = () => {
  useUser();
  return (
    <HStack
      h={"60px"}
      borderBottom={"1px solid #eee"}
      justifyContent={"space-between"}
      px={"20px"}
    >
      <Text fontSize={"18px"} fontWeight={"700"}>
        <Link to={"/"}>TODO</Link>
      </Text>

      <Box>
        <Avatar w={"35px"} h={"35px"} />
      </Box>
    </HStack>
  );
};

export default Header;
