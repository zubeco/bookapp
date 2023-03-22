import {
  Box,
  Button,
  CheckboxIcon,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { BiSearch } from "react-icons/bi";

export default function SubNav() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push(`/auth/login`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm) {
      router.push(`/books/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <div>
      <Box bg="#333333" height={"40px"} display="flex" alignItems="center">
        <Container
          maxW="1100px"
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Text
            color={"white"}
            onClick={() => router.push("/")}
            cursor="pointer"
          >
            INTERNET ACRCHIVE
          </Text>
          <Text color={"white"}>LOGO</Text>
        </Container>
      </Box>
      <Container
        maxW="1100px"
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        py={"20px"}
      >
        <Box width={"30%"}>
          <Text onClick={() => router.push("/")} cursor="pointer">
            INTERNET ACRCHIVE
          </Text>{" "}
        </Box>

        <Box
          width={"70%"}
          display="flex"
          alignItems={"center"}
          gap="25px"
          justifyContent={"end"}
        >
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                placeholder="Search for a book..."
                borderRadius={"5px"}
                border="1px solid #babbae"
                bg="white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                width="300px"
              />
              <InputRightElement>
                <BiSearch fontSize={"20px"} color="#babbae" />
              </InputRightElement>
            </InputGroup>
          </form>

          <Button
            width={"100px"}
            bg="#0376b8"
            color="#FFF"
            height={"30px"}
            cursor="pointer"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </div>
  );
}
