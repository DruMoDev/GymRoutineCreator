import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutBeforeLogin from "./components/layouts/LayoutBeforeLogin";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    element: <LayoutBeforeLogin />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signin", element: <Signin /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
