import {
  Box,
  Button,
  CircularProgress,
  Container,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { BiBasket } from "react-icons/bi";
import useBookById from "../../../api/fetchBook";
import Loader from "../../../components/atoms/Loader/Loader";
import SubNav from "../../../components/atoms/SubNav/SubNav";
import { useMutation, useQueryClient } from "react-query";
import { addCartItem, CartItem } from "../../../api/addCart";

interface Book {
  id: string;
  name: string;
  author: string;
}

interface Props {
  book: Book;
  userId: string;
}

export default function Book() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const userString =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user") ?? ""
      : "";
  const userObject = userString ? JSON.parse(userString) : null;
  const userId = userObject?.user?.user_id;
  const toast = useToast();
  // rest of your code here

  // rest of your code here

  const { data, isLoading, error } = useBookById(id as string);
  const addToCartMutation = useMutation(
    (bookId: string) => addCartItem(userId, bookId),
    {
      onSuccess: (cartItem: CartItem) => {
        queryClient.invalidateQueries("cart");
        toast({
          title: "Book added to cart",
          description: `${cartItem.name} has been added to your cart.`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
    }
  );

  return (
    <Box bg="#e1dcc5" minH={"100vh"} pb="10vh">
      <SubNav />
      <Container
        maxW="1100px"
        py={"30px"}
        minH="50vh"
        bg="#FFF"
        borderRadius={"5px"}
        border="1px solid #babbae"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <Flex width={"100%"} height="100%" gap={"20px"}>
            <Box
              width={"20%"}
              display={"flex"}
              flexDirection="column"
              gap={"10px"}
              bg="#FFFFFF"
              height={"fit-content"}
              px="15px"
              py="15px"
              border={"1px solid #DDD"}
              borderRadius="4px"
            >
              <Box cursor="pointer">
                <Image
                  src={data?.coverUrl ?? ""}
                  alt=""
                  style={{ objectFit: "contain", borderRadius: "5px" }}
                  width={220}
                  height={1000}
                />
              </Box>
              <Flex flexDirection={"column"} gap="10px" alignItems={"center"}>
                <Button
                  bg="#0376b8"
                  px="40px"
                  py="8px"
                  height={"fit-content"}
                  width={"100%"}
                  fontSize="16px"
                  color="white"
                  fontWeight={700}
                  borderRadius="5px"
                  textAlign={"center"}
                  display="flex"
                  alignItems={"center"}
                  onClick={() =>
                    data?.key && addToCartMutation.mutate(data.key)
                  }
                  disabled={addToCartMutation.isLoading}
                  cursor="pointer"
                >
                  {addToCartMutation.isLoading ? (
                    <CircularProgress size={6} color="white" mr={2} />
                  ) : (
                    <>
                      {" "}
                      <BiBasket fontSize={"20px"} />
                      <Text pl="10px">Borrow</Text>
                    </>
                  )}
                </Button>
                <Box
                  bg="#FFFFFF"
                  px="20px"
                  py="8px"
                  height={"fit-content"}
                  width={"100%"}
                  fontSize="16px"
                  color="#0376b8"
                  fontWeight={500}
                  borderRadius="5px"
                  textAlign={"center"}
                  border="2px solid #0376b8"
                >
                  Preview
                </Box>
                <Box
                  bg="#208731"
                  px="20px"
                  py="5px"
                  height={"fit-content"}
                  width={"100%"}
                  fontSize="16px"
                  color="white"
                  fontWeight={700}
                  borderRadius="5px"
                  textAlign={"center"}
                >
                  Want to read
                </Box>
              </Flex>
            </Box>
            <Box width={"80%"} py="15px">
              <Flex>
                <Box>
                  <Text color="#666" fontStyle={"oblique"} fontSize="16px">
                    An edition of{" "}
                    <Text as="span" textDecoration={"underline"}>
                      {data?.title}
                    </Text>{" "}
                    ({data?.first_publish_date})
                  </Text>
                </Box>
              </Flex>

              <Text
                fontSize={"2em"}
                fontFamily="Merriweather"
                color="#333"
                fontWeight={600}
              >
                {data?.title}
              </Text>

              {/* {data?.by_statement && (
                <Text fontSize={"1em"} color="#333">
                  by{" "}
                  <Text as="span" textDecoration={"underline"}>
                    {data?.by_statement}
                  </Text>
                </Text>
              )} */}
              {data?.subjects && (
                <Box>
                  <Text fontWeight={700}>
                    Subject:{" "}
                    {data?.subjects?.map((dat, index) => {
                      return (
                        <Text key={index} as={"span"} fontWeight="300">
                          {dat}
                        </Text>
                      );
                    })}
                  </Text>
                </Box>
              )}
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
}
