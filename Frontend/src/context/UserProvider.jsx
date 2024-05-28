import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import clienteAxios from "../config/clienteAxios";

// Crea el contexto de API
const UserContext = createContext();

// Crea el proveedor de API
const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUser = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await clienteAxios.get("/user/profile", config);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const signin = async (username, email, password) => {
    try {
      const { data } = await clienteAxios.post("/user/signin", {
        username,
        email,
        password,
      });
      toast.success(data.message);
      // Handle additional response actions here
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
      setIsAuthenticated(true);
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
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      user,
      signin,
      login,
      setUser,
      token,
      logout,
      fetchUser,
    }),
    [isAuthenticated, user, token, fetchUser]
  );

  if (loading) return <h1>Loading...</h1>;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
