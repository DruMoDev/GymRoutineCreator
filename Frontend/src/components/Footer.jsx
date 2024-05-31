/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";
import { colors } from "../utils/colors";

const Footer = ({ menu }) => {
  const { menuColor } = useUser();

  return (
    <footer className={`w-full py-2 ${colors[menuColor]} `}>
      <div className="container flex mx-auto text-white font-bold items-center gap-40 justify-center">
        <p className="italic">&copy; GymRoutineCreator 2024</p>
        <nav className="flex justify-between text-white">
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
      </div>
    </footer>
  );
};
export default Footer;
