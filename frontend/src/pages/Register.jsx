import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ email, password, displayName, role: "consumer" }); // 👈 default consumer
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        
        <input
          type="text"
          placeholder="Display Name"
          className="w-full p-3 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-red-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
