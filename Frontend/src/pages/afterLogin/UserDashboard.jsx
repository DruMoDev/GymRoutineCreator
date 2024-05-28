import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const UserDashboard = () => {
  const { isAuthenticated, user } = useUser();
  const { username } = user;

  // Render different content based on authentication status
  if (user && isAuthenticated) {
    return (
      <section className="flex-grow flex flex-col container mx-auto">
        <h1 className="mt-10 text-4xl font-semibold">
          Welcome,{" "}
          <span className="font-bold text-blue-500">{username}!</span>
        </h1>

        <div className="flex  items-center justify-center mt-32 gap-10">
          <div className="flex flex-col gap-5">
            <Link
              to="/create-single-routine"
              className="font-semibold text-xl bg-amber-500 text-white w-[400px] py-2 rounded-md text-center hover:opacity-90 transition-all">
              Create a Single Person Routine
            </Link>
            <Link
              to="/my-single-routines"
              className="font-semibold text-xl bg-amber-600 text-white w-[400px] py-2 rounded-md text-center hover:opacity-90 transition-all">
              My Single Person Routines
            </Link>
          </div>
          <div className="flex flex-col gap-5">
            <Link
              to="/create-group-routine"
              className="font-semibold text-xl bg-blue-500 text-white w-[400px] py-2 rounded-md text-center hover:opacity-90 transition-all">
              Create a Group Routine
            </Link>
            <Link
              to="/my-group-routines"
              className="font-semibold text-xl bg-blue-600 text-white w-[400px] py-2 rounded-md text-center hover:opacity-90 transition-all">
              My Group Routines
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-xl font-semibold">
        <h1>Please log in to access this page.</h1>
        <Link to="/login" className="text-blue-500 underline">
          Log in
        </Link>
      </div>
    );
  }
};
export default UserDashboard;
