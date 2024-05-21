import { createContext, useState } from "react";

// Crea el contexto de API
const UserContext = createContext();

// Crea el proveedor de API
const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };

export default UserContext;
