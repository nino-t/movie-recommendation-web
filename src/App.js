import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./layouts/master.layout";
import BrowsePage from "./pages/browse/browse.page";
import WatchPage from "./pages/watch/watch.page";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MasterLayout />}>
            <Route index element={<Navigate replace to="/browse" />} />
            <Route path="browse" element={<BrowsePage />} />
            <Route path="watch" element={<WatchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
