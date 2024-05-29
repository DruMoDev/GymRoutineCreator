import useSingleRoutine from "../hooks/useSingleRoutine";
import dateFormater from "../utils/dateFormater";

const SingleRoutine = ({ routine }) => {
  const { deleteRoutine } = useSingleRoutine();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this routine?")) {
      deleteRoutine(id);
    }
  };

  return (
    <li
      key={routine._id}
      className="border border-gray-300 rounded-md p-4 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex gap-10  items-center">
          <h2 className="text-2xl font-bold text-gray-800 ">{routine.name}</h2>
          <p className="text-gray-500 italic">
            Created at: {dateFormater(routine.createdAt)}
          </p>
        </div>
        <button
          onClick={() => handleDelete(routine._id)}
          className="bg-red-500 text-white font-bold p-2 rounded-md">
          Delete
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        {routine.exercises &&
          Object.entries(routine.exercises).map(([key, exercise]) => (
            <div
              key={key}
              className="bg-gray-200 p-3 rounded-md shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-500">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </h3>
              <p className="text-gray-700">
                <span className="font-bold">Name:</span> {exercise.name}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Sets:</span> {exercise.sets}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Reps:</span> {exercise.reps}
              </p>
            </div>
          ))}
      </div>
    </li>
  );
};
export default SingleRoutine;
