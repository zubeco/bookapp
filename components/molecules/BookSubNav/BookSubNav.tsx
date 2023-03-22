import { Box, Flex } from "@chakra-ui/react";
import React from "react";

interface BookSubNavProps {
  handleOrderStateChange: (name: string) => void;
  navState: string;
}

export default function BookSubNav({
  handleOrderStateChange,
  navState,
}: BookSubNavProps) {
  return (
    <Flex
      py="0px"
      my="20px"
      gap={"20px"}
      borderBottom="1px solid #ddd"
      fontWeight={700}
      fontSize="13px"
    >
      <Box
        onClick={() => handleOrderStateChange("books")}
        py="5px"
        px="13px"
        cursor={"pointer"}
        color={navState === "books" ? "#02598b" : "#66666"}
        borderBottom={navState === "books" ? "2px solid #02598b" : "none"}
      >
        Books
      </Box>
      <Box
        onClick={() => handleOrderStateChange("authors")}
        py="5px"
        px="13px"
        cursor={"pointer"}
        color={navState === "authors" ? "#02598b" : "#66666"}
        borderBottom={navState === "authors" ? "2px solid #02598b" : "none"}
      >
        Authors
      </Box>
      <Box
        onClick={() => handleOrderStateChange("search-inside")}
        py="5px"
        px="13px"
        cursor={"pointer"}
        color={navState === "search-inside" ? "#02598b" : "#66666"}
        borderBottom={
          navState === "search-inside" ? "2px solid #02598b" : "none"
        }
      >
        Search Inside
      </Box>
    </Flex>
  );
}
