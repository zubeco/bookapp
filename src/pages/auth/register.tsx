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
import { useMutation } from "react-query";
import { registerPost } from "../../../api/registerApi";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    registerPost,
    {
      onSuccess: (data) => {
        console.log(data);
        // Do something with the response data
        router.push(`/auth/login`);
      },
      onError: (error) => {
        console.error(error);
        // Do something with the error
      },
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name: fullname, email, password });
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
              color={"#5a5f4e"}
              bg="#c5c0a5"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </Button>
            {/* {isError && (
              <FormHelperText mt="20px" color="red">
                {error.message}
              </FormHelperText>
            )} */}
            {isSuccess && (
              <FormHelperText mt="20px" color="green">
                Registration successful!
              </FormHelperText>
            )}
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}
