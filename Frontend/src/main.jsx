import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "../src/context/UserProvider";
import { OrganizationProvider } from "./context/OrganizationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <OrganizationProvider>
        <App />
      </OrganizationProvider>
    </UserProvider>
  </React.StrictMode>
);
