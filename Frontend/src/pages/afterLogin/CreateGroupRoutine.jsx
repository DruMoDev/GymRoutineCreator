import { useState } from "react";
import { toast } from "react-toastify";
import generateID from "../../utils/generateID";

const CreateGroupRoutine = () => {
  const [routineName, setRoutineName] = useState("");
  const [blocks, setBlocks] = useState([]);

  const addBlock = () => {
    setBlocks([
      ...blocks,
      {
        id: generateID(),
        blockName: "",
        exercises: [{ id: generateID(), name: "" }],
      },
    ]);
  };

  const removeBlock = (blockId) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
  };

  const addExercise = (blockId) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              exercises: [...block.exercises, { id: generateID(), name: "" }],
            }
          : block
      )
    );
  };

  const removeExercise = (blockId, exerciseId) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              exercises: block.exercises.filter(
                (exercise) => exercise.id !== exerciseId
              ),
            }
          : block
      )
    );
  };

  const handleExerciseChange = (blockId, exerciseId, value) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              exercises: block.exercises.map((exercise) =>
                exercise.id === exerciseId
                  ? { ...exercise, name: value }
                  : exercise
              ),
            }
          : block
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (
      !routineName ||
      blocks.some((block) => block.exercises.some((exercise) => !exercise.name))
    ) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      toast.success("Routine created successfully");
    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <section className="flex-grow flex flex-col container mx-auto">
      <h1 className="text-4xl font-bold text-blue-500 mt-10">
        Create Group Routine
      </h1>

      <form
        className="flex flex-col my-10 w-[500px] border shadow px-10 mx-auto bg-slate-100 py-5"
        onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-blue-500 mb-5">Group Routine</h2>
        <label
          htmlFor="name"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Routine Name:
          <input
            type="text"
            id="name"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            name="name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {blocks.map((block, blockIndex) => (
          <div key={block.id} className="mb-5">
            <label className="text-2xl font-semibold text-gray-800 mb-3">
              Block {blockIndex + 1}:
              <input
                value={block.blockName}
                onChange={(e) =>
                  setBlocks(
                    blocks.map((b) =>
                      b.id === block.id
                        ? { ...b, blockName: e.target.value }
                        : b
                    )
                  )
                }
                type="text"
                className="border ml-2 border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
            {block.exercises.map((exercise, exerciseIndex) => (
              <div key={exercise.id} className="flex items-center mb-2">
                <label
                  htmlFor={`exercise-${block.id}-${exercise.id}`}
                  className="text-xl font-semibold text-gray-800 flex flex-col flex-grow">
                  Exercise {exerciseIndex + 1}:
                  <input
                    type="text"
                    id={`exercise-${block.id}-${exercise.id}`}
                    value={exercise.name}
                    onChange={(e) =>
                      handleExerciseChange(
                        block.id,
                        exercise.id,
                        e.target.value
                      )
                    }
                    name={`exercise-${block.id}-${exercise.id}`}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeExercise(block.id, exercise.id)}
                  className="bg-red-500 text-white font-bold p-2 rounded-md ml-2 mt-5">
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addExercise(block.id)}
              className="bg-green-500 text-white font-bold p-2 rounded-md mt-2">
              Add Exercise
            </button>
            <button
              type="button"
              onClick={() => removeBlock(block.id)}
              className="bg-red-500 text-white font-bold p-2 rounded-md ml-2 mt-2">
              Remove Block
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addBlock}
          className="bg-blue-500 text-white font-bold p-2 rounded-md mt-5">
          Add Block
        </button>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold p-2 rounded-md mt-5">
          Create Routine
        </button>
      </form>
    </section>
  );
};

export default CreateGroupRoutine;
