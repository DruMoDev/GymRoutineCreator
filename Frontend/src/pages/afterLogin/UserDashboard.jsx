import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

const UserDashboard = () => {
  const { isAuthenticated, user, setMenuColor } = useUser();
  const { username } = user;

  useEffect(() => {
    setMenuColor("indigo");
  }, [setMenuColor]);

  // Render different content based on authentication status
  if (user && isAuthenticated) {
    return (
      <section className="flex-grow flex flex-col container mx-auto pt-20">
        <h1 className="text-4xl font-semibold">
          Welcome,{" "}
          <span className="font-bold text-indigo-500">{username}!</span>
        </h1>

        <div className="flex items-center justify-center mt-32">
          <div className="flex flex-col gap-10">
            <Link
              to="/private-area"
              className="font-semibold text-3xl bg-emerald-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-emerald-600 transition-all">
              Private Area
            </Link>

            <Link
              to={`/organization`}
              className="font-semibold text-3xl bg-rose-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-rose-600 transition-all">
              Organization Area
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-xl font-semibold">
        <h1>Please log in to access this page.</h1>
        <Link to="/login" className="text-indigo-500 underline">
          Log in
        </Link>
      </div>
    );
  }
};

export default UserDashboard;
