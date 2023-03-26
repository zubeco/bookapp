import axios, { AxiosResponse } from "axios";

const API_URL = "https://book-api-5x48.onrender.com/cart/cart_items";

export interface CartItem {
  itemId: string;
  name: string;
  quantity: number;
  user: string;
  _id: string;
  __v: number;
}

interface ErrorResponse {
  message: string;
}

export const addCartItem = async (
  userId: string,
  bookId: string
): Promise<CartItem> => {
  console.log(userId, bookId, "eee");
  try {
    const response: AxiosResponse<CartItem> = await axios.post(
      `${API_URL}/${userId}/${bookId}`
    );
    return response.data;
  } catch (error: any) {
    const errorMessage: string =
      (error.response?.data as ErrorResponse)?.message || "An error occurred.";
    throw new Error(errorMessage);
  }
};
