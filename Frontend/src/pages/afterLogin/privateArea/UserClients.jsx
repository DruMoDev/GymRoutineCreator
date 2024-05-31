import { Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const UserClients = () => {
  const { user, deleteClient } = useUser();
  const { clients } = user;

  return (
    <section className="flex-grow flex flex-col container mx-auto pt-20">
      <div className="flex justify-between items-center mr-10">
        <h1 className="text-4xl font-semibold">
          My <span className="">Clients</span>
        </h1>
        <div className="flex gap-5">
          <Link
            className="bg-emerald-500 text-white text-xl font-bold py-3 min-w-[260px] text-center hover:bg-green-600 transition-all rounded-md"
            to={"create-client"}>
            Add Clients
          </Link>
          <Link
            to={"/private-area"}
            type="submit"
            className="bg-amber-500 text-white text-xl font-bold py-3 min-w-[260px] text-center hover:bg-amber-600 transition-all rounded-md">
            Return
          </Link>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {clients && clients.length > 0 ? (
          clients.map((client) => (
            <div
              key={client._id}
              className="p-6 bg-white rounded-lg shadow-lg border border-emerald-500">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">{client.name}</h2>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-md transition-all hover:bg-red-600 uppercase font-bold place-self-start"
                  onClick={() => deleteClient(client._id)}>
                  Delete
                </button>
              </div>
              <p className="font-semibold mb-2">
                Age: <span className="font-normal">{client.age}</span>
              </p>
              <p className="font-semibold mb-2">
                Observations:{" "}
                <span className="font-normal">{client.observations}</span>
              </p>
              <p className="font-semibold">
                Routines:{" "}
                {client.routines.length > 0 ? (
                  client.routines.map((routine) => (
                    <span key={routine._id} className="font-normal">
                      {routine.name}
                    </span>
                  ))
                ) : (
                  <span className="font-normal">No Routines</span>
                )}
              </p>
            </div>
          ))
        ) : (
          <h3 className="text-2xl font-semibold">
            No clients yet.{" "}
            <Link to={"create-client"} className="text-green-500 underline">
              Add
            </Link>{" "}
            a new one!
          </h3>
        )}
      </div>
    </section>
  );
};

export default UserClients;
