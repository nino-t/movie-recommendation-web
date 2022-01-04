import axios from "axios";
import React from "react";
import _get from "lodash/get";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Heading, Input, Stack } from "@chakra-ui/react";

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const signIn = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    axios
      .post(process.env.REACT_APP_API_URL + "/login", payload)
      .then((response) => {
        const token = _get(response, "data.data.token", "");
        const user = {
          id: _get(response, "data.data.id", ""),
          email: _get(response, "data.data.email", ""),
        };

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login succeed!");
        navigate("/browse", { replace: true });
      })
      .catch((err) => {
        alert("Your credential is not valid!");
      });
  };

  return (
    <Flex h={"100vh"} justify={"center"} alignItems={"center"}>
      <Box border="1px solid #bdc3c7" p={4} borderRadius={10} bg="#fff">
        <Stack as="form" onSubmit={signIn}>
          <Heading as="h3" fontSize={20} mb={4}>
            Sign In
          </Heading>
          <Box mb={2}>
            <label htmlFor="email">Email</label>
            <Input
              type={"email"}
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <label htmlFor="password">Password</label>
            <Input
              type={"password"}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
          <br />
          <Button type="submit">Sign In</Button>
        </Stack>

        <Box textAlign={"center"} mt={6}>
          Back to{" "}
          <Link to="/browse" style={{ color: "#3498db" }}>
            Home
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignInPage;
