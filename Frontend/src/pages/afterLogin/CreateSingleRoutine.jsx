import { useState } from "react";
import { toast } from "react-toastify";
import useSingleRoutine from "../../hooks/useSingleRoutine";

const CreateSingleRoutine = () => {
  const { createRoutine } = useSingleRoutine();
  const [clientName, setClientName] = useState("");
  const [exercises, setExercises] = useState({
    preventive1: { name: "", sets: 0, reps: 0 },
    preventive2: { name: "", sets: 0, reps: 0 },
    kneeDominant: { name: "", sets: 0, reps: 0 },
    hipDominant: { name: "", sets: 0, reps: 0 },
    core: { name: "", sets: 0, reps: 0 },
    lowerUpperBody: { name: "", sets: 0, reps: 0 },
    clientRelated: { name: "", sets: 0, reps: 0 },
    rotational: { name: "", sets: 0, reps: 0 },
    starts: { name: "", sets: 0, reps: 0 },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [exercise, field] = name.split(".");
    setExercises({
      ...exercises,
      [exercise]: { ...exercises[exercise], [field]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!clientName || Object.values(exercises).some((ex) => !ex.name)) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      console.log(exercises);

      await createRoutine(clientName, exercises);
      toast.success("Routine created successfully");
      setClientName("");
      setExercises({
        preventive1: { name: "", sets: 0, reps: 0 },
        preventive2: { name: "", sets: 0, reps: 0 },
        kneeDominant: { name: "", sets: 0, reps: 0 },
        hipDominant: { name: "", sets: 0, reps: 0 },
        core: { name: "", sets: 0, reps: 0 },
        lowerUpperBody: { name: "", sets: 0, reps: 0 },
        clientRelated: { name: "", sets: 0, reps: 0 },
        rotational: { name: "", sets: 0, reps: 0 },
        starts: { name: "", sets: 0, reps: 0 },
      });
    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <section className="flex-grow flex flex-col container mx-auto">
      <h1 className="text-4xl font-bold text-blue-500 mt-10">
        Create Single Routine
      </h1>

      <form
        className="flex flex-col my-10 max-w-[1000px]  border shadow px-10 mx-auto bg-slate-100 py-5"
        onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-blue-500 mb-5">
          Single Routine
        </h2>
        <label
          htmlFor="clientName"
          className="text-xl font-bold text-gray-800 flex flex-col mb-5">
          <span className="mb-2">Client Name:</span>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            name="clientName"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
          />
        </label>
        {Object.keys(exercises).map((exercise) => (
          <div
            key={exercise}
            className="mb-5 p-5 border rounded-lg bg-white shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              {exercise
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label
                htmlFor={`${exercise}.name`}
                className="text-lg font-medium text-gray-800 flex flex-col mb-2 justify-between">
                <span className="mb-1">Exercise Name:</span>
                <input
                  type="text"
                  id={`${exercise}.name`}
                  name={`${exercise}.name`}
                  value={exercises[exercise].name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label
                htmlFor={`${exercise}.sets`}
                className="text-lg font-medium text-gray-800 flex flex-col mb-2 justify-between">
                <span className="mb-1">Sets:</span>
                <input
                  type="number"
                  id={`${exercise}.sets`}
                  name={`${exercise}.sets`}
                  value={exercises[exercise].sets}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label
                htmlFor={`${exercise}.reps`}
                className="text-lg font-medium text-gray-800 flex flex-col mb-2 justify-between">
                <span className="mb-1">Reps:</span>
                <input
                  type="number"
                  id={`${exercise}.reps`}
                  name={`${exercise}.reps`}
                  value={exercises[exercise].reps}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold p-2 rounded-md mt-5">
          Create Routine
        </button>
      </form>
    </section>
  );
};

export default CreateSingleRoutine;
