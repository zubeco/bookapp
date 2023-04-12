import React from "react";
import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { Book } from "../../../utils/books.interface";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";

interface BookListProps {
  books: Book[] | undefined;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

export default function BookList({
  books,
  pageNumber,
  setPageNumber,
}: BookListProps) {
  const router = useRouter();

  return (
    <div>
      <Flex width={"100%"} height="100%" gap={"20px"}>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection="column"
          gap={"10px"}
        >
          {books?.map((book, index) => {
            return (
              <Box
                h="180px"
                bg="#F9F9F9"
                borderRadius={"5px"}
                py="10px"
                px="10px"
                display={"flex"}
                gap="10px"
                key={index}
              >
                <Box
                  onClick={() => router.push(`/book/${book.key}`)}
                  cursor="pointer"
                >
                  <Image
                    src={book?.coverUrl}
                    alt=""
                    style={{ objectFit: "contain", borderRadius: "5px" }}
                    width={130}
                    height={1000}
                  />
                </Box>

                <Box h="100%" w="100%">
                  <Flex
                    width={"100%"}
                    px="10px"
                    py="10px"
                    justifyContent={"space-between"}
                    h="100%"
                    alignItems={"center"}
                  >
                    <Box
                      display={"flex"}
                      flexDirection="column"
                      gap={"10px"}
                      onClick={() => router.push(`/book/${book.key}`)}
                      cursor="pointer"
                    >
                      <Text fontWeight={700} fontSize="16px" color="#000000">
                        {book.title}
                      </Text>{" "}
                      <Text fontWeight={400} fontSize="16px" color="#000000">
                        <Text as="span">by</Text> California and Hawaii, 1990
                      </Text>{" "}
                      <Text fontWeight={400} fontSize=".75em" color="#666">
                        First published in{" "}
                        <Text as="span">{book.first_publish_year}</Text>
                      </Text>{" "}
                      <Text fontWeight={400} fontSize=".75em" color="#666">
                        <Text as={"span"} color="#02598b">
                          {book.edition_count} editions
                        </Text>{" "}
                        {book.language && (
                          <Text as={"span"}>
                            in {book.language?.length} languages
                          </Text>
                        )}{" "}
                        {book.ia && (
                          <Text as={"span"}>
                            — {book.ia?.length} previewable
                          </Text>
                        )}{" "}
                      </Text>
                    </Box>
                    <Flex
                      flexDirection={"column"}
                      gap="10px"
                      alignItems={"center"}
                    >
                      <Box
                        bg="#0376b8"
                        px="40px"
                        py="8px"
                        height={"fit-content"}
                        width={"fit-content"}
                        fontSize="16px"
                        color="white"
                        fontWeight={700}
                        borderRadius="5px"
                        onClick={() => router.push(`/book/${book.key}`)}
                        cursor="pointer"
                      >
                        View Book
                      </Box>
                      {/* <Box
                        bg="#208731"
                        px="20px"
                        py="8px"
                        height={"fit-content"}
                        width={"fit-content"}
                        fontSize="16px"
                        color="white"
                        fontWeight={700}
                        borderRadius="5px"
                      >
                        Want to read
                      </Box> */}
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            );
          })}
          <Flex
            justifyContent={"space-between"}
            alignItems="center"
            mt="40px"
            mb="20px"
          >
            <Button
              onClick={() => setPageNumber(pageNumber - 1)}
              isDisabled={pageNumber === 1}
            >
              <IoIosArrowBack />
              <Text as="span" pl="5px">
                Previous
              </Text>
            </Button>
            <Button onClick={() => setPageNumber(pageNumber + 1)}>
              <Text as="span" pr="5px">
                Next
              </Text>
              <IoIosArrowForward />
            </Button>
          </Flex>
        </Box>
        {/* <Box width={"20%"} bg=""></Box> */}
      </Flex>
    </div>
  );
}
