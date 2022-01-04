import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Stack,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

const MasterHeader = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link to="/browse">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              fontWeight={"bold"}
              color="#e74c3c"
            >
              MovieStock
            </Text>
          </Link>
        </Flex>
        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          {user ? (
            <Link to="/auth/signout">
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg="#e74c3c"
                _hover={{
                  bg: "#c0392b",
                }}
              >
                ({user.email}) Logout
              </Button>
            </Link>
          ) : (
            <Link to="/auth/signin">
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg="#e74c3c"
                _hover={{
                  bg: "#c0392b",
                }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default MasterHeader;
