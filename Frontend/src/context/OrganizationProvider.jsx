import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUser from "../hooks/useUser";
import clienteAxios from "../config/clienteAxios";

const OrganizationContext = createContext();

const OrganizationProvider = ({ children }) => {
  const [organization, setOrganization] = useState(null);
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchOrganization = useCallback(async () => {
    if (!token) {
      return;
    }
    try {
      const { data } = await clienteAxios.get("/organization", config);
      setOrganization(data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  const createOrganization = async (organizationData) => {
    try {
      const { data } = await clienteAxios.post(
        "/organization",
        organizationData,
        config
      );
      setOrganization(data.organization);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <OrganizationContext.Provider value={{ createOrganization, organization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export { OrganizationProvider };
export default OrganizationContext;
