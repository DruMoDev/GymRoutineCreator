import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

const LayoutBeforeLogin = () => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const menu = [
    { name: "Home", path: "/" },
    { name: "Sign In", path: "/signin" },
    { name: "Log In", path: "/login" },
  ];

  return (
    <div className=" min-h-screen flex flex-col">
      <Header menu={menu} />
      <main className="min-h-[400px] flex-grow">
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
export default LayoutBeforeLogin;
