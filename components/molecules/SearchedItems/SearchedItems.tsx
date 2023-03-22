import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import Loader from "../../atoms/Loader/Loader";
import BookSubNav from "../BookSubNav/BookSubNav";
import { Book } from "../../../utils/books.interface";
import BookList from "../BookList/BookList";

interface SearchedItemsProps {
  isLoading: boolean;
  books: Book[] | undefined;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

export default function SearchedItems({
  isLoading,
  books,
  pageNumber,
  setPageNumber,
}: SearchedItemsProps) {
  const [navState, setNavState] = useState("books");

  const handleOrderStateChange = (name: string) => {
    setNavState(name);
  };

  return (
    <Container
      maxW="1100px"
      py={"30px"}
      minH="50vh"
      bg="#FFF"
      borderRadius={"5px"}
      border="1px solid #babbae"
    >
      <Heading color="#666666" fontSize={"30px"} fontWeight={700}>
        Search Books
      </Heading>
      <BookSubNav
        handleOrderStateChange={handleOrderStateChange}
        navState={navState}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {navState === "books" && (
            <BookList
              books={books}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          )}
          {navState === "authors" && <div>Authors</div>}
          {navState === "search-inside" && <div>search-inside</div>}
        </>
      )}
    </Container>
  );
}
