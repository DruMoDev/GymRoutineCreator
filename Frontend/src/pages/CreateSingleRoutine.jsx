import { useState } from "react";
import { toast } from "react-toastify";

const CreateSingleRoutine = () => {
  const [name, setName] = useState("");
  const [preventive1, setPreventive1] = useState("");
  const [preventive2, setPreventive2] = useState("");
  const [kneeDominant, setKneeDominant] = useState("");
  const [hipDominant, setHipDominant] = useState("");
  const [core, setCore] = useState("");
  const [lowerUpperBody, setLowerUpperBody] = useState("");
  const [clientRelated, setClientRelated] = useState("");
  const [rotational, setRotational] = useState("");
  const [starts, setStarts] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (
      !name ||
      !preventive1 ||
      !preventive2 ||
      !kneeDominant ||
      !hipDominant ||
      !core ||
      !lowerUpperBody ||
      !clientRelated ||
      !rotational ||
      !starts
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
        Create Single Routine
      </h1>

      <form
        className="flex flex-col  my-10 w-[500px] border shadow px-10 mx-auto bg-slate-100 py-5"
        onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-blue-500 mb-5">
          Single Routine
        </h2>
        <label
          htmlFor="name"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="preventive1"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Preventive Exercise 1:
          <input
            type="text"
            id="preventive1"
            value={preventive1}
            onChange={(e) => setPreventive1(e.target.value)}
            name="preventive1"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="preventive2"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Preventive Exercise 2:
          <input
            type="text"
            id="preventive2"
            value={preventive2}
            onChange={(e) => setPreventive2(e.target.value)}
            name="preventive2"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="kneeDominant"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Knee Dominant Exercise:
          <input
            type="text"
            id="kneeDominant"
            value={kneeDominant}
            onChange={(e) => setKneeDominant(e.target.value)}
            name="kneeDominant"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="hipDominant"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Hip Dominant Exercise:
          <input
            type="text"
            id="hipDominant"
            value={hipDominant}
            onChange={(e) => setHipDominant(e.target.value)}
            name="hipDominant"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="core"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          CORE Exercise:
          <input
            type="text"
            id="core"
            value={core}
            onChange={(e) => setCore(e.target.value)}
            name="core"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="lowerUpperBody"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Lower-Upper Body Exercise:
          <input
            type="text"
            id="lowerUpperBody"
            value={lowerUpperBody}
            onChange={(e) => setLowerUpperBody(e.target.value)}
            name="lowerUpperBody"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="clientRelated"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Client Related Exercise:
          <input
            type="text"
            id="clientRelated"
            value={clientRelated}
            onChange={(e) => setClientRelated(e.target.value)}
            name="clientRelated"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="rotational"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Rotational Exercise:
          <input
            type="text"
            id="rotational"
            value={rotational}
            onChange={(e) => setRotational(e.target.value)}
            name="rotational"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label
          htmlFor="starts"
          className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
          Starts Exercise::
          <input
            type="text"
            id="starts"
            value={starts}
            onChange={(e) => setStarts(e.target.value)}
            name="starts"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

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
