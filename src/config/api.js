
import axios from "axios";

const Api = axios.create({
  baseURL: "http://45.93.139.193:6001/api/",
  // baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,                            
});

export default Api;
