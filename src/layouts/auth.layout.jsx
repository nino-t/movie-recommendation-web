import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const AuthLayout = () => {
  return (
    <>
      <Box px={8} py={6} bg="#ecf0f1">
        <Outlet />
      </Box>
    </>
  );
};

export default AuthLayout;
