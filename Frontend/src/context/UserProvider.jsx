import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/clienteAxios";

// Crea el contexto de API
const UserContext = createContext();

// Crea el proveedor de API
const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const signin = async (username, email, password) => {
    try {
      const { data } = await clienteAxios.post("/user/signin", {
        username,
        email,
        password,
      });
      toast.success(data.message);
      setTimeout(() => {}, 2000);
      // Handle the response here
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await clienteAxios.post("/user/login", {
        email,
        password,
      });
      toast.success("Logged in successfully");
      setUser(data);
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = "/";
  }

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signin,
        login,
        setUser,
        token,
        logout
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

export default UserContext;
