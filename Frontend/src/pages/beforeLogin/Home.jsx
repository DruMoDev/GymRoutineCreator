import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-bold text-indigo-500">
        Welcome to GymRoutineCreator
      </h1>
      <h3 className="text-xl font-semibold mt-5">
        Create your own gym routine or choose from our pre-made routines and
        start your fitness journey today!
      </h3>
      <img
        src="https://res.cloudinary.com/dpjbtovxz/image/upload/v1716884316/GymRoutineCreator/home_page_banner_poavvg.jpg"
        alt="Gym"
        height="400"
        width="600"
        className="mt-10 rounded"
      />
      <p className="text-3xl font-semibold mt-5 transition-all">
        <Link to="/signin" className="text-indigo-500 font-bold underline hover:text-indigo-600">
          Sign In
        </Link>{" "}
        or{" "}
        <Link to="/login" className="text-indigo-500 font-bold underline hover:text-indigo-600">
          Log In
        </Link>{" "}
        to get started!
      </p>
    </div>
  );
};
export default Home;
