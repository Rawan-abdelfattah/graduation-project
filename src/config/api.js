
import axios from "axios";

const Api = axios.create({
  baseURL: "https://doctor-bot.medicalonlineacademy.com/api",
  // baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json", 
  },
  withCredentials: true,                            
});

export default Api;
