import SingleRoutine from "../../components/SingleRoutine";
import useSingleRoutine from "../../hooks/useSingleRoutine";

const MySingleRoutines = () => {
  const { routines } = useSingleRoutine();

  return (
    <section className="flex-grow flex flex-col container mx-auto">
      <h1 className="text-4xl font-bold text-blue-500 mt-10">
        My Single Routines
      </h1>
      <div className="my-10 w-full mx-auto bg-slate-100 p-5 rounded-lg shadow-md">
        {routines.length === 0 ? (
          <p className="text-xl text-gray-700">No routines created yet.</p>
        ) : (
          <ul className="space-y-4">
            {routines.map((routine) => (
              <SingleRoutine key={routine._id} routine={routine} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MySingleRoutines;
