import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // must match backend port
});

export default api;
