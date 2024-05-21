import { Link } from "react-router-dom";

const Header = ({ menu }) => {
  return (
    <header className="w-full bg-blue-500 py-2">
      <nav className="container flex justify-between text-white font-bold text-xl mx-auto">
        <Link to="/">GymRoutineCreator</Link>
        <ul className="flex gap-10">
          {menu.map((item) => {
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    item.action && item.action();
                  }}>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
