import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useBookById from "../../../api/fetchBook";
import Loader from "../../../components/atoms/Loader/Loader";
import SubNav from "../../../components/atoms/SubNav/SubNav";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, error } = useBookById(id as string);

  console.log(data);
  return (
    <Box bg="#e1dcc5" minH={"100vh"} pb="10vh">
      <SubNav />
      <Container
        maxW="1100px"
        py={"30px"}
        minH="70vh"
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
                <Box
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
                >
                  Borrow
                </Box>
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
                    (1939)
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

              {data?.by_statement && (
                <Text fontSize={"1em"} color="#333">
                  by{" "}
                  <Text as="span" textDecoration={"underline"}>
                    {data?.by_statement}
                  </Text>
                </Text>
              )}
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  );
}
