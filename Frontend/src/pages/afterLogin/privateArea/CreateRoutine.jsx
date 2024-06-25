import { useState } from "react";
import { toast } from "react-toastify";
import useUser from "../../../hooks/useUser";
import { Link, useParams } from "react-router-dom";

// TODO: Acabar todo el componente para que se envie bien y se guarden los datos en la base de datos

const CreateRoutine = ({ clientId, onClose }) => {
  const { addRoutine } = useUser();
  const [routineName, setRoutineName] = useState("");
  const [blocks, setBlocks] = useState([]);
  const [exercises, setExercises] = useState([
    { name: "", sets: 0, reps: 0, weight: 0, observations: "" },
  ]);
  const { id } = useParams();

  const handleAddBlock = () => {
    setBlocks([
      ...blocks,
      {
        blockName: "",
        exercises: [
          { name: "", sets: 0, reps: 0, weight: 0, observations: "" },
        ],
      },
    ]);
  };

  const handleAddExerciseToBlock = (blockIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].exercises.push({
      name: "",
      sets: 0,
      reps: 0,
      weight: 0,
      observations: "",
    });
    setBlocks(newBlocks);
  };

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: 0, reps: 0, weight: 0, observations: "" },
    ]);
  };

  const handleBlockChange = (blockIndex, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex][field] = value;
    setBlocks(newBlocks);
  };

  const handleExerciseChangeInBlock = (
    blockIndex,
    exerciseIndex,
    field,
    value
  ) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].exercises[exerciseIndex][field] = value;
    setBlocks(newBlocks);
  };

  const handleExerciseChange = (exerciseIndex, field, value) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRoutine(clientId, { name: routineName, blocks, exercises });
      toast.success("Routine created successfully");
      onClose();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="p-6 bg-white rounded-lg shadow-md container mx-auto my-5 border">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-semibold">Create New Routine</h2>
        <Link
          to={`/private-area/clients/${id}`}
          type="submit"
          className="bg-amber-500 text-white text-2xl font-bold py-2 min-w-[260px] text-center hover:bg-amber-600 transition-all rounded-md">
          Return
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium text-gray-700 text-2xl">
            Routine Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            required
          />
        </div>

        {blocks.map((block, blockIndex) => (
          <div key={blockIndex} className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Block Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={block.blockName}
              onChange={(e) =>
                handleBlockChange(blockIndex, "blockName", e.target.value)
              }
              required
            />
            {block.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Exercise Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={exercise.name}
                  onChange={(e) =>
                    handleExerciseChangeInBlock(
                      blockIndex,
                      exerciseIndex,
                      "name",
                      e.target.value
                    )
                  }
                  required
                />
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Sets
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={exercise.sets}
                  onChange={(e) =>
                    handleExerciseChangeInBlock(
                      blockIndex,
                      exerciseIndex,
                      "sets",
                      e.target.value
                    )
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Reps
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={exercise.reps}
                  onChange={(e) =>
                    handleExerciseChangeInBlock(
                      blockIndex,
                      exerciseIndex,
                      "reps",
                      e.target.value
                    )
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Weight
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={exercise.weight}
                  onChange={(e) =>
                    handleExerciseChangeInBlock(
                      blockIndex,
                      exerciseIndex,
                      "weight",
                      e.target.value
                    )
                  }
                />
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Observations
                </label>
                <textarea
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  value={exercise.observations}
                  onChange={(e) =>
                    handleExerciseChangeInBlock(
                      blockIndex,
                      exerciseIndex,
                      "observations",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="mt-4 bg-green-500 text-white font-bold py-1 px-4 rounded hover:bg-green-600 transition-all"
              onClick={() => handleAddExerciseToBlock(blockIndex)}>
              Add Exercise to Block
            </button>
          </div>
        ))}

        <button
          type="button"
          className="mt-6 bg-blue-500 text-white font-bold py-1 px-4 rounded hover:bg-blue-600 transition-all"
          onClick={handleAddBlock}>
          Add Block
        </button>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
          <div className="grid grid-cols-2 gap-10">
            {exercises.map((exercise, exerciseIndex) => (
              <div
                key={exerciseIndex}
                className="flex flex-col gap-2 border-2 shadow-md p-3 rounded-md bg-slate-100 ">
                <label className="block text-xl font-medium text-gray-700">
                  Exercise Name
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={exercise.name}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "name",
                        e.target.value
                      )
                    }
                    required
                  />
                </label>
                <label className="block text-lg font-medium text-gray-700 ml-3">
                  Sets
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={exercise.sets}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "sets",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className="block text-lg font-medium text-gray-700 ml-3">
                  Reps
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "reps",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className="block text-lg font-medium text-gray-700 ml-3">
                  Weight
                  <input
                    type="number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={exercise.weight}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "weight",
                        e.target.value
                      )
                    }
                  />
                </label>
                <label className="block text-lg font-medium text-gray-700 ml-3">
                  Observations
                  <textarea
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    value={exercise.observations}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "observations",
                        e.target.value
                      )
                    }
                  />
                </label>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 bg-green-500 text-white font-bold py-1 px-4 rounded hover:bg-green-600 transition-all"
            onClick={handleAddExercise}>
            Add Exercise
          </button>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all">
          Create Routine
        </button>
      </form>
    </section>
  );
};

export default CreateRoutine;
