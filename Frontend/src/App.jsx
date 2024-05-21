import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutBeforeLogin from "./components/layouts/LayoutBeforeLogin";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Login from "./pages/Login";
import LayoutAfterLogin from "./components/layouts/LayoutAfterLogin";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import UserSettings from "./pages/UserSettings";
import CreateSingleRoutine from "./pages/CreateSingleRoutine";
import CreateGroupRoutine from "./pages/CreateGroupRoutine";
import MySingleRoutines from "./pages/MySingleRoutines";
import MyGroupRoutines from "./pages/MyGroupRoutines";
import useUser from "../src/hooks/useUser";

const App = () => {
  const { isAuthenticated } = useUser();

  const beforeLoginRoutes = createBrowserRouter([
    {
      element: <LayoutBeforeLogin />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signin", element: <Signin /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);

  const afterLoginRoutes = createBrowserRouter([
    {
      element: <LayoutAfterLogin />,
      children: [
        { path: "/", element: <UserDashboard /> },
        { path: "create-single-routine", element: <CreateSingleRoutine /> },
        { path: "create-group-routine", element: <CreateGroupRoutine /> },
        { path: "my-single-routines", element: <MySingleRoutines /> },
        { path: "my-group-routines", element: <MyGroupRoutines /> },
        { path: "profile", element: <UserProfile /> },
        { path: "settings", element: <UserSettings /> },
      ],
    },
  ]);

  return (
    <RouterProvider
      router={isAuthenticated ? afterLoginRoutes : beforeLoginRoutes}
    />
  );
};

export default App;
