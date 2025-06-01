import { instance } from "./instance";

export const login = async (email, password) => {
  try {
    const response = await instance.post("/accounts/login/", {
      email,
      password,
    });

    // Store tokens in localStorage
    if (response.data.access) {
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phone_number,
        })
      );
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const signup = async (formData) => {
  try {
    const response = await instance.post(
      "/accounts/register-user-and-parent-together/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Add axios interceptor to add token to requests
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
