import axios from "axios";

const API_URL = "https://book-api-5x48.onrender.com";

export type FetchedCartItem = CartItem[];

export interface CartItem {
  _id: string;
  itemId: string;
  name: string;
  quantity: number;
  user: string;
  __v: number;
}

const userString =
  typeof localStorage !== "undefined" ? localStorage.getItem("user") ?? "" : "";
const userObject = userString ? JSON.parse(userString) : null;
const userId = userObject?.user?.user_id;

export const fetchCart = async () => {
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
