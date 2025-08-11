import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    // "https://construction-website-backend-production.up.railway.app/api/construction",
    "http://localhost:8080/api/construction",
});

export default axiosInstance;
