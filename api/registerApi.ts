import axios from "axios";

const API_URL = "https://book-api-5x48.onrender.com/users";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  name: string;
  email: string;
  _id: string;
  user_id: string;
  __v: number;
}

export const registerPost = async (
  registerData: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_URL}/register`,
      registerData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        "An error occurred."
    );
  }
};
