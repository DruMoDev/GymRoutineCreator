import { ToastContainer } from "react-toastify";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import useUser from "../../hooks/useUser";

const LayoutAfterLogin = () => {
  const { logout } = useUser();
  const menu = [
    { name: "Home", path: "/" },
    { name: "Private Area", path: "/private-area" },
    { name: "Organization", path: "/organization" },
    { name: "Log out", action: () => logout() },
  ];

  return (
    <div className=" min-h-screen flex flex-col">
      <Header menu={menu} />
      <main className="flex-grow flex flex-col">
        <ToastContainer
          closeOnClick
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <Outlet />
      </main>
      <Footer menu={menu} />
    </div>
  );
};
export default LayoutAfterLogin;
