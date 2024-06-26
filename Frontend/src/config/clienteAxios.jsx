import axios from "axios";

const clienteAxios = axios.create({
  baseURL: `https://gym-routine-creator-backend.vercel.app/api`,
  // baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default clienteAxios;
