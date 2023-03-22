import { useQuery } from "react-query";
import { EachBook } from "../utils/book.interface";
import axios from "axios";

const fetchBookById = async (id: string): Promise<EachBook> => {
  const { data } = await axios.get<EachBook>(
    `https://book-api-5x48.onrender.com/book/get_book_by_id/${id}`
  );
  return data;
};

const useBookById = (id: string) => {
  return useQuery<EachBook>(["eachBook", id], () => fetchBookById(id));
};

export default useBookById;
