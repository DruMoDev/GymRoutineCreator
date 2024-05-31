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
  const [menuColor, setMenuColor] = useState(() => {
    return localStorage.getItem("menuColor") || "indigo";
  });

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    localStorage.setItem("menuColor", menuColor);
  }, [menuColor]);

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
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
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
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      window.location.href = "/";
    }
  };

  const addClient = async (client) => {
    try {
      const { data } = await clienteAxios.post("/user/clients", client, config);
      setUser((prevState) => ({
        ...prevState,
        clients: [...prevState.clients, data.client],
      }));
      toast.success(data.message);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteClient = async (clientId) => {
    try {
      const { data } = await clienteAxios.delete(
        `/user/clients/${clientId}`,
        config
      );
      setUser((prevState) => ({
        ...prevState,
        clients: prevState.clients.filter((client) => client._id !== clientId),
      }));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
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
      addClient,
      deleteClient,
      menuColor,
      setMenuColor,
    }),
    [isAuthenticated, user, token, fetchUser, menuColor]
  );

  if (loading) return <h1>Loading...</h1>;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
