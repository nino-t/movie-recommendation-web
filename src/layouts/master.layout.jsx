import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import MasterHeader from "../components/master-header";

const MasterLayout = () => {
  return (
    <>
      <MasterHeader />
      <Box px={8} py={6}>
        <Outlet />
      </Box>
    </>
  );
};

export default MasterLayout;
