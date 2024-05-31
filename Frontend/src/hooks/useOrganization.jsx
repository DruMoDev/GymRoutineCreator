import { useContext } from "react";
import OrganizationContext from "../context/OrganizationProvider";

const useOrganization = () => {
  return useContext(OrganizationContext);
};

export default useOrganization;
