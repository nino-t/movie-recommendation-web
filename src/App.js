import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./layouts/master.layout";
import BrowsePage from "./pages/browse/browse.page";
import WatchPage from "./pages/watch/watch.page";
import AuthLayout from "./layouts/auth.layout";
import SignInPage from "./pages/sign-in/signin.page";
import SignOutPage from "./pages/sign-out/signout.page";

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
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="signin" element={<SignInPage />} />
            <Route path="signout" element={<SignOutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
