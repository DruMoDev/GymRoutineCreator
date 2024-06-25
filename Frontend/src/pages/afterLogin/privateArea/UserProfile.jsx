import { useState } from "react";
import { toast } from "react-toastify";
import useUser from "../../../hooks/useUser";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, updateUser } = useUser();
  const [userData, setUserData] = useState(user);
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState(userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formState);
    setUserData(formState);
    setEditMode(false);
    toast.success("Profile updated successfully");
  };

  return (
    <section className="flex-grow flex flex-col container mx-auto pt-20">
      <h1 className="text-4xl font-bold ">User Profile</h1>

      <div className="flex flex-col my-10 w-[500px] border shadow px-10 mx-auto bg-zinc-100 py-5">
        <h2 className="text-3xl font-bold text-zinc-600 mb-5">
          {editMode ? "Edit Profile" : "Profile Details"}
        </h2>

        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="username"
              className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                value={formState.username}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>

            <label
              htmlFor="email"
              className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>

            <label
              htmlFor="password"
              className="text-xl font-semibold text-gray-800 flex flex-col mb-5">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </label>

            <button
              type="submit"
              className="bg-emerald-500 text-white font-bold p-2 rounded-md mt-5">
              Save Changes
            </button>
          </form>
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-5">
              Username: {userData.username}
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-5">
              Email: {userData.email}
            </p>

            <div className="flex gap-5 text-center">
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-emerald-500 text-white font-bold py-2 rounded-md mt-5 w-[150px] hover:bg-emerald-600">
                Edit Profile
              </button>
              <Link
                to={"/private-area"}
                type="submit"
                className="bg-amber-500 text-white font-bold py-2 rounded-md mt-5 w-[150px] hover:bg-amber-600">
                Return
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserProfile;
