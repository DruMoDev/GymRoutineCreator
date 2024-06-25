import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import { useEffect } from "react";

const PrivateAreaDashboard = () => {
  const { user, setMenuColor } = useUser();
  const { username } = user;

  useEffect(() => {
    setMenuColor("emerald");
  }, [setMenuColor]);

  return (
    <section className="flex-grow flex flex-col container mx-auto pt-20">
      <h1 className=" text-4xl font-semibold">
        Welcome to your Private Area,{" "}
        <span className="font-bold text-emerald-500">{username}!</span>
        
      </h1>

      <div className="flex items-center justify-center mt-32">
        <div className="flex flex-col gap-10">
          <Link
            to="clients"
            className="font-semibold text-3xl bg-emerald-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-emerald-600 transition-all">
            My Clients{" "}
          </Link>

          <Link
            to={`profile`}
            className="font-semibold text-3xl bg-zinc-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-zinc-600 transition-all">
            Profile
          </Link>

          <Link
            to={`/`}
            className="font-semibold text-3xl bg-amber-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-amber-600 transition-all">
            Return
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PrivateAreaDashboard;
