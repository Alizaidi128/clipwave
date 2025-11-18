import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-between px-6 py-2 text-gray-800 shadow-md">


      <div className="flex gap-6">
        <Link to="/" className="hover:text-red-600 font-medium">Home</Link>

        {!user && (
          <>
            <Link to="/login" className="hover:text-red-600 font-medium">Login</Link>
            <Link to="/register" className="hover:text-red-600 font-medium">Register</Link>
          </>
        )}

        {user?.role === "consumer" && (
          <button onClick={logout} className="hover:text-red-600 font-medium">Logout</button>
        )}

        {user?.role === "creator" && (
          <>
            <Link to="/upload" className="hover:text-red-600 font-medium">Upload</Link>
            <Link to="/dashboard" className="hover:text-red-600 font-medium">Dashboard</Link>
            <button onClick={logout} className="hover:text-red-600 font-medium">Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
