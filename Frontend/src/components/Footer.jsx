import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 py-2">
      <div className="container flex mx-auto text-white font-bold items-center gap-40 justify-center">
        <p className="italic">&copy; GymRoutineCreator 2021</p>
        <nav className="flex justify-between text-white">
          <ul className="flex gap-10">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
export default Footer;
