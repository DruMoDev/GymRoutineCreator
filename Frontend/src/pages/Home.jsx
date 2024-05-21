import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-bold text-blue-500">
        Welcome to GymRoutineCreator
      </h1>
      <h3 className="text-xl font-semibold mt-5">
        Create your own gym routine or choose from our pre-made routines and
        start your fitness journey today!
      </h3>
      <img
        src="https://source.unsplash.com/1600x900/?gym"
        alt="Gym"
        height="400"
        width="600"
        className="mt-10"
      />
      <p className="text-xl font-semibold mt-5">
        <Link to="/signin" className="text-blue-500 font-bold underline">
          Sign In
        </Link>{" "}
        or{" "}
        <Link to="/login" className="text-blue-500 font-bold underline">
          Log In
        </Link>{" "}
        to get started!
      </p>
    </div>
  );
};
export default Home;
