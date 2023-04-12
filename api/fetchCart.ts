import axios from "axios";

const API_URL = "https://book-api-5x48.onrender.com";

export type FetchedCartItem = CartItem[];

export interface CartItem {
  _id: string;
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  instock: number;
  coverUrl: string;
  user: string;
  __v: number;
}

export const fetchCart = async (userId: string) => {
  try {
    const response = await axios.get<FetchedCartItem>(
      `${API_URL}/cart/cart_items/${userId}/cart`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        "An error occurred."
    );
  }
};
