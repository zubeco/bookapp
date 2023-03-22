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
import { loginPost } from "../../../api/loginApi";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    loginPost,
    {
      onSuccess: (data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        const redirectUrl = router.query.redirectUrl || "/";
        router.push(redirectUrl.toString());
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ email, password });
  };
  console.log(error);

  return (
    <Box
      bg={"#E5E5E5"}
      height={"100vh"}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
      color={"black"}
    >
      <Box
        bg={"white"}
        width={{ base: "90%", md: "50%", lg: "30%" }}
        height={"fit"}
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        py="50px"
        px="20px"
      >
        <Text fontSize={"16px"} fontWeight={500} mb="10px">
          Welcome to learn...
        </Text>
        <AuthBtns />
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl mt="50px" width={"100%"}>
            <FormLabel>Email address</FormLabel>
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
              {isLoading ? "Loading..." : "Login"}
            </Button>
            {isSuccess && (
              <FormHelperText textAlign="center" mt="20px">
                Login successful!
              </FormHelperText>
            )}
            {/* {isError && (
              <FormHelperText textAlign="center" mt="20px" color="red.500">
                {error && error?.message
                  ? error?.message
                  : "An error occurred."}
              </FormHelperText>
            )} */}
          </FormControl>
        </form>
      </Box>
    </Box>
  );
}
