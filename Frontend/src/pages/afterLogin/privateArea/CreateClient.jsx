import { useState } from "react";
import useUser from "../../../hooks/useUser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CreateClient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [observations, setObservations] = useState("");
  const { addClient } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clientData = {
        name,
        age,
        observations,
      };
      await addClient(clientData);
      setName("");
      setAge("");
      setObservations("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="flex-grow flex flex-col container mx-auto">
      <h1 className="mt-10 text-4xl font-semibold">Create a New Client</h1>
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
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Observations
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
          />
        </div>

        <div className="flex gap-5">
          <button
            type="submit"
            className="bg-emerald-500 text-white font-bold py-2 text-xl min-w-[230px] text-center rounded hover:bg-emerald-600 transition-all">
            Create Client
          </button>
          <Link
          to={"/private-area/clients"}
            type="submit"
            className="bg-amber-500 text-white font-bold py-2 text-xl min-w-[230px] text-center rounded hover:bg-amber-600 transition-all">
            Return
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateClient;
