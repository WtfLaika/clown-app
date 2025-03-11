import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
});
