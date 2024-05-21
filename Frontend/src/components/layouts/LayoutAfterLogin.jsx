import { ToastContainer } from "react-toastify";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import useUser from "../../../hooks/useUser";

const LayoutAfterLogin = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useUser();
  const menu = [
    { name: "Home", path: "/" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
    {
      name: "Log out",
      action: () => {
        setIsAuthenticated(false);
        navigate("/");
      },
    },
  ];

  return (
    <div className=" min-h-screen flex flex-col">
      <Header menu={menu} />
      <main className="min-h-[400px] flex-grow flex flex-col">
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
