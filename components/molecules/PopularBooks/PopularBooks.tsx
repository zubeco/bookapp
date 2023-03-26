import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import getPopularBooks from "../../../api/fetchPopularBooks";

export default function PopularBooks() {
  const router = useRouter();
  const { data, isLoading, isError } = getPopularBooks();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching popular books.</p>;
  }

  return (
    <Box>
      <Container
        maxW="1100px"
        display="flex"
        justifyContent={"space-between"}
        // alignItems="center"
        flexDirection={"column"}
      >
        <Text mt="50px" fontSize={"30px"} fontWeight="600">
          {" "}
          Most Popular Books
        </Text>
        <Box py="20px">
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {Array.isArray(data) &&
              data.map((each, index) => {
                return (
                  <GridItem
                    w="100%"
                    h="content-fit"
                    bg="#FFFFFF"
                    px="20px"
                    py={"20px"}
                    borderRadius="5px"
                    onClick={() => router.push(`/book/${each.key}`)}
                    cursor="pointer"
                    key={index}
                  >
                    <Image
                      src={each?.coverUrl}
                      alt="hello"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "22vh",
                        position: "relative", // Set position to relative
                        borderRadius: "5px",
                      }}
                      width={100}
                      height={100}
                    />
                    <Box
                      pt="10px"
                      display={"flex"}
                      flexDirection="column"
                      gap={"5px"}
                    >
                      <Text
                        textAlign={"center"}
                        fontWeight="600"
                        fontSize={"20px"}
                        textTransform="capitalize"
                      >
                        {each?.title}
                      </Text>{" "}
                      <Text fontWeight={700} textAlign={"center"}>
                        Author:{" "}
                        <Text
                          as={"span"}
                          fontWeight="400"
                          textTransform="capitalize"
                        >
                          {each?.author}
                        </Text>{" "}
                      </Text>
                      <Text fontWeight={700} textAlign={"center"}>
                        Total Edition:{" "}
                        <Text
                          as={"span"}
                          fontWeight="400"
                          textTransform="capitalize"
                        >
                          {each?.edition_count}
                        </Text>{" "}
                      </Text>
                      <Text fontWeight={700} textAlign={"center"}>
                        First Publish Year:{" "}
                        <Text
                          as={"span"}
                          fontWeight="400"
                          textTransform="capitalize"
                        >
                          {each?.firstPublishYear}
                        </Text>{" "}
                      </Text>
                    </Box>
                  </GridItem>
                );
              })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
