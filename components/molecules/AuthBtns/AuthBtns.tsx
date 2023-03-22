import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function AuthBtns() {
  const router = useRouter();
  return (
    <Flex
      justifyContent={"center"}
      gap="20px"
      my="10px"
      bg={"#ECF2FF"}
      py="8px"
      px="40px"
      borderRadius={"20px"}
    >
      <Box
        onClick={() => router.push("/auth/login")}
        bg={router.pathname === "/auth/login" ? "#c5c0a5" : "#ECF2FF"}
        px="30px"
        borderRadius={"20px"}
        py="2px"
        cursor={"pointer"}
        textDecoration="none"
        fontSize={"16px"}
        fontWeight={500}
        color={router.pathname === "/auth/login" ? "#5a5f4e" : "#000000"}
      >
        Login
      </Box>
      <Box
        onClick={() => router.push("/auth/register")}
        bg={router.pathname === "/auth/register" ? "#c5c0a5" : "#ECF2FF"}
        px="30px"
        borderRadius={"20px"}
        py="2px"
        cursor={"pointer"}
        textDecoration="none"
        fontSize={"16px"}
        fontWeight={500}
        color={router.pathname === "/auth/register" ? "#5a5f4e" : "#000000"}
      >
        Register
      </Box>
    </Flex>
  );
}
