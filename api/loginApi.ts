import axios from "axios";

const API_URL = "https://book-api-5x48.onrender.com/users";

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    user_id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const loginPost = async (
  loginData: LoginData
): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      loginData
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      (error.response && error.response.data && error.response.data.message) ||
        "An error occurred."
    );
  }
};
