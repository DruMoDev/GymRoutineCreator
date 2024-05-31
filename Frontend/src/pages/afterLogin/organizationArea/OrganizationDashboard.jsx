import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import useOrganization from "../../../hooks/useOrganization";
import { useEffect } from "react";

const OrganizationDashboard = () => {
  const { user, setMenuColor } = useUser();
  const { organization } = useOrganization();

  useEffect(() => {
    setMenuColor("rose");
  }, [setMenuColor]);

  return (
    <section className="flex-grow flex flex-col container mx-auto pt-20">
      {organization ? (
        <>
          <h1 className="text-4xl font-semibold">
            Welcome to the Organization Dashboard,{" "}
            <span className="font-bold text-rose-500">
              {organization?.name}!
            </span>
          </h1>
          <div className="flex items-center justify-center mt-32">
            <div className="flex flex-col gap-10">
              <Link
                to="/organization/clients"
                className="font-semibold text-3xl bg-rose-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-rose-600 transition-all">
                Organization Clients
              </Link>

              <Link
                to="/organization/staff"
                className="font-semibold text-3xl bg-lime-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-lime-600 transition-all">
                Organization Staff
              </Link>

              {organization.director === user._id && (
                <Link
                  to="/organization/settings"
                  className="font-semibold text-3xl bg-zinc-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-zinc-600 transition-all">
                  Organization Settings
                </Link>
              )}

              <Link
                to="/"
                className="font-semibold text-3xl bg-amber-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-amber-600 transition-all">
                Returns{" "}
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-semibold">
            You don't have an organization yet.
          </h1>

          <div className="mx-auto mt-32">
            <Link
              to="/organization/create-organization"
              className="font-semibold text-3xl bg-green-500 text-white min-w-[400px] py-4 px-10 rounded-md text-center hover:bg-green-600 transition-all">
              Create Organization
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default OrganizationDashboard;
