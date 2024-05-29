import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "../src/context/UserProvider";
import { SingleRoutineProvider } from "./context/SingleRoutineProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <SingleRoutineProvider>
        <App />
      </SingleRoutineProvider>
    </UserProvider>
  </React.StrictMode>
);
