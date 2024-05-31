import { Link } from "react-router-dom";
import { colors } from "../utils/colors";
import useUser from "../hooks/useUser";

const Header = ({ menu }) => {
  const { menuColor } = useUser();

  return (
    <header className={`w-full py-2 ${colors[menuColor]} }`}>
      <nav className="container flex justify-between text-white font-bold text-xl mx-auto">
        <Link to="/">GymRoutineCreator</Link>
        <ul className="flex gap-10">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                onClick={() => {
                  item.action && item.action();
                }}
                to={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
