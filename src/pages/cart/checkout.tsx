import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { fetchCart } from "../../../api/fetchCart";
import Loader from "../../../components/atoms/Loader/Loader";
import SubNav from "../../../components/atoms/SubNav/SubNav";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import axios from "axios";
import { BiX } from "react-icons/bi";
import { HiArrowNarrowRight } from "react-icons/hi";

export type FetchedCartItem = CartItem[];

export interface CartItem {
  _id: string;
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  instock: number;
  coverUrl: string;
  user: string;
  __v: number;
}

export default function Checkout() {
  const router = useRouter();
  const toast = useToast();
  const userString =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("user") ?? ""
      : "";
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const userObject = userString ? JSON.parse(userString) : null;
  const userId = userObject?.user?.user_id;
  const { data, isLoading, isError, error, refetch } = useQuery<CartItem[]>(
    "cart",
    () => fetchCart(userId)
  );

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  const onAddClick = async (cartItemId: any) => {
    setCartItems((prevCartItems) => {
      const copiedCart = [...prevCartItems];
      const singleItemIndex = copiedCart.findIndex(
        (product: any) => product.itemId === cartItemId
      );

      if (singleItemIndex !== -1) {
        const singleItem = { ...copiedCart[singleItemIndex] };
        singleItem.quantity = singleItem.quantity + 1;
        copiedCart[singleItemIndex] = singleItem;
        console.log(copiedCart); // check if copiedCart has the updated cart data
      }

      return copiedCart;
    });
  };

  const onRemoveClick = async (cartItemId: any) => {
    setCartItems((prevCartItems) => {
      const copiedCart = [...prevCartItems];
      const singleItemIndex = copiedCart.findIndex(
        (product: any) => product.itemId === cartItemId
      );

      if (singleItemIndex !== -1) {
        const singleItem = { ...copiedCart[singleItemIndex] };
        singleItem.quantity = Math.max(1, singleItem.quantity - 1); // ensure quantity does not go below 1
        copiedCart[singleItemIndex] = singleItem;
        console.log(copiedCart); // check if copiedCart has the updated cart data
      }

      return copiedCart;
    });
  };

  const removeItemFromCart = (userId: string, itemId: string) => {
    axios
      .delete(
        `https://book-api-5x48.onrender.com/cart/cart_items/${userId}/${itemId}`
      )
      .then((res) => {
        console.log(res);
        if (res) {
          toast({
            title: "Book removed from cart",
            description: `Book has been removed from your cart.`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          router.reload();
        } else {
          toast({
            title: "An error occured",
            description: `Book could not be removed from your cart at the moment.`,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const total = cartItems.reduce((acc, items) => {
      return acc + items.price * items.quantity;
    }, 0);
    setTotalPrice(total);
  }, [cartItems]);

  const pay = () => {
    if (cartItems) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    router.push(`/cart/confirm-order`);
  };

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
          <Loader bgColor="" />
        ) : (
          <>
            {" "}
            {!cartItems.length ? (
              <Box
                width={"100%"}
                minH="50vh"
                textAlign={"center"}
                justifyContent="center"
                display={"flex"}
                alignItems="center"
                flexDirection={"column"}
              >
                <Text fontWeight={700} fontSize="21px">
                  Your Cart is Empty
                </Text>
                <Text fontWeight={400} fontSize="16px">
                  When you add items they will appear here
                </Text>
                <Flex
                  alignItems={"center"}
                  bg="#0376b8"
                  px={"20px"}
                  py="5px"
                  gap={3}
                  borderRadius="10px"
                  color={"white"}
                  mt="20px"
                  fontWeight={600}
                  onClick={() => router.push("/")}
                  cursor="pointer"
                >
                  <Text>Return to store</Text>
                  <HiArrowNarrowRight fontSize={"20px"} />
                </Flex>
              </Box>
            ) : (
              <>
                <>
                  <Flex width={"100%"} gap="20px">
                    <TableContainer width={"70%"}>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Item</Th>
                            <Th>Price</Th>
                            <Th>Quantity</Th>
                          </Tr>
                        </Thead>
                        {cartItems &&
                          cartItems?.map((cart, index) => {
                            return (
                              <Tbody key={index}>
                                <Tr>
                                  <Td>
                                    <Flex>
                                      <Image
                                        src={cart?.coverUrl}
                                        alt="hello"
                                        style={{
                                          objectFit: "cover",
                                          width: "50px",
                                          height: "50px",
                                          position: "relative",
                                          borderRadius: "10px",
                                        }}
                                        width={220}
                                        height={100}
                                      />
                                      <Box
                                        display={"flex"}
                                        flexDirection="column"
                                        justifyContent="center"
                                        pl="15px"
                                      >
                                        <Text color="#E60000" fontSize="12px">
                                          <Text as="span">{cart?.instock}</Text>{" "}
                                          left in stock
                                        </Text>{" "}
                                        <Text
                                          color=""
                                          fontWeight="700"
                                          maxWidth="250px"
                                          fontSize="14px"
                                          whiteSpace="normal"
                                        >
                                          {cart?.name}
                                        </Text>
                                        <Button
                                          bg="transparent"
                                          display={"flex"}
                                          justifyContent="left"
                                          leftIcon={<BiX />}
                                          px="0"
                                          mx="0"
                                          fontSize={"13px"}
                                          py="0"
                                          my="0"
                                          onClick={() =>
                                            removeItemFromCart(
                                              cart.user,
                                              cart.itemId
                                            )
                                          }
                                          disabled={isLoading}
                                        >
                                          Remove
                                        </Button>
                                      </Box>
                                    </Flex>
                                  </Td>
                                  <Td>
                                    {" "}
                                    <Box>
                                      <Heading
                                        as="h3"
                                        color="#353535"
                                        fontSize="20px"
                                        fontWeight="400"
                                      >
                                        {`$ ${cart?.price}`}
                                      </Heading>
                                    </Box>
                                  </Td>
                                  <Td>
                                    {" "}
                                    <Flex
                                      align="center"
                                      borderRadius="8px"
                                      h="40px"
                                      w="138px"
                                      overflow="hidden"
                                    >
                                      <Button
                                        h="full"
                                        borderRadius="8px 0 0 8px"
                                        border="1px solid #D5D5D5"
                                        borderTopWidth="2px"
                                        borderRightWidth="0"
                                        borderBottomWidth="2px"
                                        borderLeftWidth="2px"
                                        cursor="pointer"
                                        onClick={() =>
                                          onRemoveClick(cart.itemId)
                                        }
                                      >
                                        <AiOutlineMinus />
                                      </Button>
                                      <Text
                                        h="full"
                                        w="100%"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        border="1px solid #D5D5D5"
                                        borderTopWidth="2px"
                                        borderBottomWidth="2px"
                                        fontWeight="semibold"
                                        fontSize="sm"
                                      >
                                        {cart?.quantity}
                                      </Text>
                                      <Button
                                        h="full"
                                        borderRadius="0 8px 8px 0"
                                        border="1px solid #D5D5D5"
                                        borderTopWidth="2px"
                                        borderRightWidth="2px"
                                        borderBottomWidth="2px"
                                        borderLeftWidth="0"
                                        cursor="pointer"
                                        onClick={() => onAddClick(cart.itemId)}
                                      >
                                        <AiOutlinePlus />
                                      </Button>
                                    </Flex>
                                  </Td>
                                  {/* <Td>
                            {" "}
                            <Box>
                              <Heading
                                as="h3"
                                color="#353535"
                                fontSize="20px"
                                fontWeight="400"
                              >
                                {`$ ${totalPrice}`}
                              </Heading>
                            </Box>
                          </Td> */}
                                </Tr>
                              </Tbody>
                            );
                          })}
                      </Table>
                    </TableContainer>
                    <Box
                      border="1px solid #ECF2FF"
                      width={"30%"}
                      minH="45vh"
                      borderRadius={"10px"}
                      py="15px"
                      px="20px"
                    >
                      <Text fontWeight={500} fontSize="18px">
                        Payment Summary
                      </Text>
                      <Flex
                        justifyContent={"space-between"}
                        mt="160px"
                        borderBottom={"1px solid #ECF2FF"}
                        pb="20px"
                      >
                        <Text fontWeight={300} fontSize="13px">
                          Item(S) Total
                        </Text>
                        <Text fontWeight={500} fontSize="16px">
                          {`$ ${totalPrice}`}
                        </Text>
                      </Flex>

                      <Flex
                        justifyContent={"space-between"}
                        mt="10px"
                        borderBottom={"1px solid #ECF2FF"}
                        pb="20px"
                      >
                        <Text fontWeight={500} fontSize="15px">
                          Total (<Text as="span">{cartItems?.length}</Text>{" "}
                          Product(S))
                        </Text>
                        <Text fontWeight={500} fontSize="16px">
                          {`$ ${totalPrice}`}
                        </Text>
                      </Flex>
                      <Flex justifyContent="center" mt="10px">
                        <Button
                          width={"100%"}
                          bg="#0376b8"
                          color={"white"}
                          onClick={pay}
                        >
                          Pay
                        </Button>
                      </Flex>
                    </Box>
                  </Flex>
                </>
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
