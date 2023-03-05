import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import AuthBtns from "../../../components/molecules/AuthBtns/AuthBtns";

export default function register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form submission behavior
    // handle form submission logic here
    console.log(password, email, fullname);
  };

  return (
    <Box
      bg={"#E5E5E5"}
      height={"100vh"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <Box
        bg={"white"}
        width={{ base: "90%", md: "50%", lg: "30%" }}
        height={"fit"}
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        py="50px"
        px="20px"
      >
        <Text fontSize={"16px"} fontWeight={500} mb="10px">
          Welcome to learn...
        </Text>
        <AuthBtns />
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl mt="50px" width={"100%"}>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              borderRadius={"20px"}
              width="100%"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <FormLabel mt="20px">Email address</FormLabel>
            <Input
              type="email"
              borderRadius={"20px"}
              width="100%"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormLabel mt="20px">Password</FormLabel>
            <Input
              type="password"
              borderRadius={"20px"}
              width="100%"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              width={"100%"}
              mt="40px"
              color={"white"}
              bg="#4D47C3"
            >
              Register
            </Button>
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}
