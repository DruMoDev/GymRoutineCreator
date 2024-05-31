import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import useOrganization from "../../../hooks/useOrganization";

const CreateOrganization = () => {
  const [name, setName] = useState("");
  const [extras, setExtras] = useState("");
  const { createOrganization, organization } = useOrganization();
  const navigate = useNavigate();

  useEffect(() => {
    if (organization) {
      navigate("/organization");
    }
  }, [organization, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const organizationData = {
        name,
        extras,
      };
      await createOrganization(organizationData);
      setName("");
      setExtras("");
      navigate("/organization");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="flex-grow flex flex-col container mx-auto">
      <h1 className="mt-10 text-4xl font-semibold">
        Create a New Organization
      </h1>
      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extras
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={extras}
            onChange={(e) => setExtras(e.target.value)}
          />
        </div>

        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 transition-all">
            Create Organization
          </button>
          <Link
            to={"/private-area/organizations"}
            className="bg-amber-500 text-white font-bold py-2 px-6 rounded hover:bg-amber-600 transition-all">
            Return
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateOrganization;
