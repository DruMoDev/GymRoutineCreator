import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutBeforeLogin from "./components/layouts/LayoutBeforeLogin";
import Home from "./pages/beforeLogin/Home";
import Signin from "./pages/beforeLogin/Signin";
import Login from "./pages/beforeLogin/Login";
import LayoutAfterLogin from "./components/layouts/LayoutAfterLogin";
import UserDashboard from "./pages/afterLogin/UserDashboard";
import UserProfile from "./pages/afterLogin/UserProfile";
import UserSettings from "./pages/afterLogin/UserSettings";
import CreateSingleRoutine from "./pages/afterLogin/CreateSingleRoutine";
import CreateGroupRoutine from "./pages/afterLogin/CreateGroupRoutine";
import MySingleRoutines from "./pages/afterLogin/MySingleRoutines";
import MyGroupRoutines from "./pages/afterLogin/MyGroupRoutines";
import useUser from "./hooks/useUser";
import ErrorBoundari from "./pages/ErrorBoundari";

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
        { path: "create-single-routine", element: <CreateSingleRoutine /> },
        { path: "create-group-routine", element: <CreateGroupRoutine /> },
        { path: "my-single-routines", element: <MySingleRoutines /> },
        { path: "my-group-routines", element: <MyGroupRoutines /> },
        { path: "profile", element: <UserProfile /> },
        { path: "settings", element: <UserSettings /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default App;
