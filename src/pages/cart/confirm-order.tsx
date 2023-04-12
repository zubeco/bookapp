import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SubNav from "../../../components/atoms/SubNav/SubNav";
import { RiCheckLine } from "react-icons/ri";
import Image from "next/image";
import Loader from "../../../components/atoms/Loader/Loader";
import { useRouter } from "next/router";
import { HiArrowNarrowLeft } from "react-icons/hi";

interface CartItem {
  coverUrl: string;
  name: string;
  quantity: number;
  price: number;
}

export default function ConfirmOrder() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [users, setUsers] = useState<{ user?: { email: string } } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedCartItems = window.localStorage.getItem("cartItems");
    const cartData = storedCartItems ? JSON.parse(storedCartItems) : [];
    setCartItems(cartData);

    const storedUserData = window.localStorage.getItem("user");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    setUsers(userData);

    setTimeout(() => {
      setLoading(false);
    }, 1000); // 5 seconds delay
  }, []);

  function generateRandomNumber() {
    const min = 1000000000; // smallest 10-digit number
    const max = 9999999999; // largest 10-digit number
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  console.log(generateRandomNumber());
  console.log(users);
  return (
    <Box bg="#e1dcc5" minH={"100vh"} pb="10vh">
      <Box
        bg="#333333"
        height={"40px"}
        display="flex"
        alignItems="center"
        mb="60px"
      >
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
        py={"30px"}
        minH="50vh"
        bg="#FFF"
        borderRadius={"5px"}
        border="1px solid #babbae"
      >
        {loading ? (
          <Loader bgColor={"#FFF"} />
        ) : (
          <>
            {" "}
            <Flex
              justifyContent={"center"}
              flexDirection="column"
              alignItems={"center"}
            >
              {" "}
              <Box
                w="100px"
                h="100px"
                borderWidth="2px"
                borderColor="#32A071"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="#E1FFF2"
                borderRadius="35px"
              >
                <Box bg="#32A071" borderRadius="16px" p="1">
                  <RiCheckLine color="#FFFFFF" style={{ fontSize: "45px" }} />
                </Box>
              </Box>
              <Text
                color={"#353535"}
                py="10px"
                fontWeight="600"
                fontSize={"25px"}
              >
                Thank you!
              </Text>
              <Text fontSize={"21px"} fontWeight="400" pb="10px">
                Your order{" "}
                <Text
                  as={"span"}
                  fontWeight="600"
                  fontSize={"21px"}
                  textAlign="center"
                >
                  #{generateRandomNumber()}
                </Text>{" "}
                has been placed!
              </Text>
              <Text textAlign={"center"} maxW="80%">
                We are getting started on your order right away, and you will
                receive an order confirmation email shortly to{" "}
                <Text
                  as={"span"}
                  fontWeight="600"
                  fontSize={"18px"}
                  textAlign="center"
                >
                  {users && <>{users?.user?.email}</>}{" "}
                </Text>{" "}
                If the email doesnt arrive within 2 minutes, Please check your
                spam folder.
              </Text>
            </Flex>
            <Box py={"30px"} px="30px">
              <Text color={"#3A3A3A"} fontWeight="700" fontSize={"27px"}>
                Order List
              </Text>
              {cartItems.map((cart, index) => {
                return (
                  <Box
                    display={{ lg: "flex" }}
                    flexDirection={{ lg: "row" }}
                    justifyContent={{ lg: "space-between" }}
                    py="2"
                    borderBottom="1px"
                    borderColor="#E5E5E5"
                    my="5"
                    key={index}
                  >
                    <Flex
                      justifyContent={{ sm: "space-between" }}
                      pb={{ sm: "0" }}
                    >
                      <Flex mt="0">
                        <Box
                          cursor="pointer"
                          style={{ height: "50px", borderRadius: "30px" }}
                        >
                          <Image
                            src={cart?.coverUrl ?? ""}
                            alt=""
                            style={{
                              objectFit: "contain",
                              borderRadius: "5px",
                              height: "100%",
                            }}
                            width={50}
                            height={50}
                          />
                        </Box>
                        <Box ml="5">
                          <Heading
                            fontSize={{ base: "14px", sm: "18px" }}
                            fontWeight="semibold"
                            color="#353535"
                            maxW={{ base: "200px", sm: "261px" }}
                          >
                            {cart?.name}
                          </Heading>
                        </Box>
                      </Flex>
                    </Flex>

                    <Text
                      color="#616161"
                      pl={{ base: "80px", sm: "150px" }}
                      pb={{ base: "2", lg: "0" }}
                    >
                      #{generateRandomNumber()}
                    </Text>
                    <Text
                      color="#616161"
                      pl={{ base: "80px", sm: "150px" }}
                      pb={{ base: "2", lg: "0" }}
                    >
                      QTY:{cart?.quantity}
                    </Text>
                    <Text
                      color="#353535"
                      fontSize="16px"
                      fontWeight="bold"
                      pl={{ base: "80px", sm: "150px" }}
                      pb={{ base: "2", lg: "0" }}
                    >
                      ${cart?.price}
                    </Text>
                  </Box>
                );
              })}
              <Flex justifyContent={"flex-end"}>
                {" "}
                <Flex
                  justifyContent={"flex-end"}
                  alignItems={"center"}
                  mt="80px"
                  bg="#0376b8"
                  px={"20px"}
                  py="5px"
                  gap={3}
                  borderRadius="10px"
                  color={"white"}
                  fontWeight={600}
                  onClick={() => router.push("/")}
                  cursor="pointer"
                  w={"fit-content"}
                >
                  <Text>Return to store</Text>
                  <HiArrowNarrowLeft fontSize={"20px"} />
                </Flex>
              </Flex>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
