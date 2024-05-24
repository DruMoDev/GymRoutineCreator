/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="text-5xl font-bold text-blue-500">Log In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-5">
        <label className="flex flex-col text-xl font-semibold mt-5">
          Email:{" "}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 p-2 rounded-md mt-2 font-normal"
          />
        </label>
        <label className="flex flex-col text-xl font-semibold mt-5">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 p-2 rounded-md mt-2 font-normal"
          />
        </label>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
      <p className="text-xl font-semibold mt-5">
        Don't have an account?{" "}
        <Link to="/signin" className="text-blue-500 font-bold underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Login;
