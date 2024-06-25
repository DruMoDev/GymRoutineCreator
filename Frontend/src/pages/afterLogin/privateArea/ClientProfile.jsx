import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUser from "../../../hooks/useUser";
import Modal from "../../../components/Modal";

const ClientProfile = () => {
  const { id } = useParams();
  const { user, updateClient } = useUser();
  const [client, setClient] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [observations, setObservations] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getClient = user.clients.find((client) => client._id === id);
    setClient(getClient);
    setName(getClient.name);
    setAge(getClient.age);
    setObservations(getClient.observations);
  }, [id, user.clients]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateClient(id, { name, age, observations });
      setIsModalVisible(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  //   const handleAddRoutine = async (e) => {
  //     e.preventDefault();
  //     try {
  //       await addRoutine(id, newRoutine);
  //       setClient({ ...client, routines: [...client.routines, newRoutine] });
  //       setNewRoutine({ name: "", exercises: [] });
  //       toast.success("Routine added successfully");
  //     } catch (err) {
  //       toast.error(err.response.data.message);
  //     }
  //   };

  //   const handleDeleteRoutine = async (routineId) => {
  //     try {
  //       await deleteRoutine(id, routineId);
  //       setClient({
  //         ...client,
  //         routines: client.routines.filter(
  //           (routine) => routine._id !== routineId
  //         ),
  //       });
  //       toast.success("Routine deleted successfully");
  //     } catch (err) {
  //       toast.error(err.response.data.message);
  //     }
  //   };

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex-grow flex flex-col container mx-auto">
      <div className="flex justify-between items-center text-center mt-10">
        <h1 className="text-4xl font-semibold">Client Profile</h1>
        <Link
          to={"/private-area/clients"}
          type="submit"
          className="bg-amber-500 text-white text-2xl font-bold py-2 min-w-[260px] text-center hover:bg-amber-600 transition-all rounded-md mr-10">
          Return
        </Link>
      </div>
      <div className="mt-6 text-xl flex justify-between border py-3 shadow-md rounded-md items-center">
        <div className="flex flex-col gap-3 indent-3">
          <p>
            <strong>Name:</strong> {client && client.name}
          </p>
          <p>
            <strong>Age:</strong> {client && client.age}
          </p>
          <p>
            <strong>Observations:</strong> {client && client.observations}
          </p>
        </div>
        <button
          onClick={() => setIsModalVisible(true)}
          className="bg-blue-500 text-white text-2xl font-bold py-2 min-w-[260px] text-center rounded hover:bg-blue-600 transition-all  mr-10">
          Edit Profile
        </button>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <form className="space-y-6" onSubmit={handleUpdate}>
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
              Age
            </label>
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
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all">
            Update Client
          </button>
        </form>
      </Modal>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Routines</h2>
        <div className="mt-4 flex justify-between">
          <div>
            {client && client.routines.length === 0 ? (
              <p>No routines available</p>
            ) : (
              <ul className="mt-4 space-y-4">
                {client &&
                  client.routines.map((routine) => (
                    <li
                      key={routine._id}
                      className="border p-4 rounded-md flex justify-between items-center">
                      <span>{routine.name}</span>
                      <button className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 transition-all">
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          <Link
            to={`create-routine`}
            className="bg-green-500 text-white text-2xl font-bold py-2 min-w-[260px] text-center rounded hover:bg-green-600 transition-all  mr-10">
            Add Routine
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClientProfile;
