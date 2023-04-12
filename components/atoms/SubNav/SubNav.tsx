import {
  Badge,
  Box,
  Button,
  CheckboxIcon,
  Container,
  Flex,
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
import { MdOutlineShoppingCart } from "react-icons/md";
import { useQuery, useQueryClient } from "react-query";
import { fetchCart } from "../../../api/fetchCart";

export type FetchedCartItem = CartItem[];

export interface CartItem {
  _id: string;
  itemId: string;
  name: string;
  quantity: number;
  user: string;
  __v: number;
}

export default function SubNav() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const userString =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user") ?? ""
      : "";
  const userObject = userString ? JSON.parse(userString) : null;
  const userId = userObject?.user?.user_id;

  const { data, isLoading, isError, error } = useQuery<CartItem[]>("cart", () =>
    fetchCart(userId)
  );

  const handleLogout = () => {
    queryClient.invalidateQueries("cart");

    // Remove the authentication token from local storage
    localStorage.removeItem("token");

    // Redirect the user to the login page
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
          <Flex
            alignItems="center"
            pl="6"
            cursor="pointer"
            onClick={() => router.push("/cart/checkout")}
            // bg="green"
            position={"relative"}
          >
            <Box as={MdOutlineShoppingCart} fontSize="3xl" />
            {data && data.length >= 1 ? (
              <Badge
                bg="#0376b8"
                borderRadius="full"
                fontSize="10px"
                position={"absolute"}
                top="0"
                right={"0px"}
                fontWeight="700"
              >
                {data.length}
              </Badge>
            ) : null}
          </Flex>
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
