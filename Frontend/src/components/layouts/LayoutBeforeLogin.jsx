import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutBeforeLogin = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Header />
      <main className="min-h-[400px] flex-grow">
        <ToastContainer
          closeOnClick
          pauseOnHover={false}
          pauseOnFocusLoss={false}
        />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default LayoutBeforeLogin;
