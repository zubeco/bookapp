import { useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SubNav from "../../../components/atoms/SubNav/SubNav";
import { BookWithCover, fetchBooks } from "../../../api/fetchApi";
import SearchedItems from "../../../components/molecules/SearchedItems/SearchedItems";

function BookSearch() {
  const router = useRouter();
  const { searchTerm } = router.query;
  const [pageNumber, setPageNumber] = useState(1);

  const queryKey = useMemo(
    () => ["books", searchTerm, pageNumber],
    [searchTerm, pageNumber]
  );

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery(queryKey, () =>
    fetchBooks(searchTerm as string, pageNumber as number)
  );
  console.log(books, pageNumber);
  // if (isError) return <div>isError: {isError.message}</div>;
  return (
    <Box bg="#e1dcc5" minH={"100vh"} pb="10vh">
      <SubNav />
      <SearchedItems
        isLoading={isLoading}
        books={books?.books}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </Box>
  );
}

export default BookSearch;
