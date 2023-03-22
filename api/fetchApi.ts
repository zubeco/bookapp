import axios from "axios";
import { Book, Pagination } from "../utils/books.interface";

const API_URL = "https://book-api-5x48.onrender.com/books/search";

interface BooksResponse {
  books: Book[];
  pagination: Pagination;
}

export interface BookWithCover extends Book {
  coverUrl: string;
}

export const fetchBooks = async (query: string, pageNumber: number) => {
  try {
    const response = await axios.get<BooksResponse>(
      `${API_URL}?q=${query}&page=${pageNumber}&limit=10`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        "An error occurred."
    );
  }
};
