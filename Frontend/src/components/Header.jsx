import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-blue-500 py-2">
      <nav className="container flex justify-between text-white font-bold text-xl mx-auto">
        <Link to="/">GymRoutineCreator</Link>
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
    </header>
  );
};
export default Header;
