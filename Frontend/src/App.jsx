import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import LayoutBeforeLogin from "./components/layouts/LayoutBeforeLogin";
import Home from "./pages/beforeLogin/Home";
import Signin from "./pages/beforeLogin/Signin";
import Login from "./pages/beforeLogin/Login";
import LayoutAfterLogin from "./components/layouts/LayoutAfterLogin";
import UserDashboard from "./pages/afterLogin/UserDashboard";
import UserProfile from "./pages/afterLogin/privateArea/UserProfile";
import useUser from "./hooks/useUser";
import ErrorBoundari from "./pages/ErrorBoundari";
import PrivateAreaDashboard from "./pages/afterLogin/privateArea/PrivateAreaDashboard";
import OrganizationDashboard from "./pages/afterLogin/organizationArea/OrganizationDashboard";
import UserClients from "./pages/afterLogin/privateArea/UserClients";
import CreateClient from "./pages/afterLogin/privateArea/CreateClient";
import CreateOrganization from "./pages/afterLogin/organizationArea/CreateOrganization";
import OrganizationClients from "./pages/afterLogin/organizationArea/OrganizationClients";
import OrganizationStaff from "./pages/afterLogin/organizationArea/OrganizationStaff";
import OrganizationSettings from "./pages/afterLogin/organizationArea/OrganizationSettings";

const App = () => {
  const { isAuthenticated } = useUser(); 
 

  const routes = createBrowserRouter([
    {
      element: isAuthenticated ? <LayoutAfterLogin /> : <LayoutBeforeLogin />,
      errorElement: <ErrorBoundari />,
      children: [
        { path: "/", element: isAuthenticated ? <UserDashboard /> : <Home /> },
        { path: "/signin", element: <Signin /> },
        { path: "/login", element: <Login /> },
        { path: "/private-area", element: <PrivateAreaDashboard /> },
        { path: "/private-area/profile", element: <UserProfile /> },
        { path: "/private-area/clients", element: <UserClients /> },
        {
          path: "/private-area/clients/create-client",
          element: <CreateClient />,
        },
        { path: "/organization", element: <OrganizationDashboard /> },
        {
          path: "/organization/create-organization",
          element: <CreateOrganization />,
        },
        { path: "/organization/clients", element: <OrganizationClients /> },
        { path: "/organization/staff", element: <OrganizationStaff /> },
        { path: "/organization/settings", element: <OrganizationSettings /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
