import axios from "axios";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

http.defaults.headers.common["Origin"] = "http://localhost:3500";
