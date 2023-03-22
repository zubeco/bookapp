import { useQuery } from "react-query";
import { PopularBooks } from "../utils/popular.interface";
import axios from "axios";

const fetchBookById = async (): Promise<PopularBooks> => {
  const { data } = await axios.get<PopularBooks>(
    `https://book-api-5x48.onrender.com/books/popular`
  );
  return data;
};

const getPopularBooks = () => {
  return useQuery<PopularBooks>(["PopularBooks"], () => fetchBookById());
};

export default getPopularBooks;
