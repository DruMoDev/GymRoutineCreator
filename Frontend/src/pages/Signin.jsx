import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !username || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (username.length < 4) {
      toast.error("Username must be at least 4 characters long");
      return;
    }
    if (username.length > 20) {
      toast.error("Username must be at most 20 characters long");
      return;
    }

    // Sign in
    try {
      toast.success("Signed in successfully");
    } catch {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h1 className="text-5xl font-bold text-blue-500">Sign In</h1>
      <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
        <label
          className="flex flex-col text-xl font-semibold mt-5"
          htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            className="border-2 border-gray-500 p-2 rounded-md mt-2 font-normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label
          className="flex flex-col text-xl font-semibold mt-5"
          htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            className="border-2 border-gray-500 p-2 rounded-md mt-2 font-normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label
          className="flex flex-col text-xl font-semibold mt-5"
          htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            className="border-2 border-gray-500 p-2 rounded-md mt-2 font-normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label
          className="flex flex-col text-xl font-semibold mt-5"
          htmlFor="confirmPassword">
          Confirm Password
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="border-2 border-gray-500 p-2 rounded-md mt-2 font-normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>

        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white font-bold p-2 rounded-md mt-5">
          Sign In
        </button>
      </form>
      <p className="text-xl font-semibold mt-5">
        You already have an account?{" "}
        <Link to="/login" className="text-blue-500 font-bold underline">
          Log In
        </Link>
      </p>
    </div>
  );
};
export default Signin;
