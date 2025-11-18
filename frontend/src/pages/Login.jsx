import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/");
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-3 rounded-md hover:bg-red-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <a href="/register" className="text-red-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
