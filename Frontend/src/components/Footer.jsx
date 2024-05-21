import { Link } from "react-router-dom";

const Footer = ({ menu }) => {
  return (
    <footer className="w-full bg-blue-500 py-2">
      <div className="container flex mx-auto text-white font-bold items-center gap-40 justify-center">
        <p className="italic">&copy; GymRoutineCreator 2024</p>
        <nav className="flex justify-between text-white">
          <ul className="flex gap-10">
            {menu.map((item) => {
              return (
                <li key={item.name}>
                  <Link to={item.path}>{item.name}</Link>
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
