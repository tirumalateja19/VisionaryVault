import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

export default function Header() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const openBody = () => {
    navigate("/body", { replace: true });
  };

  return (
    <header className="flex items-center text-black justify-between px-8 py-4 bg-gray-200">
      <div
        className="text-2xl font-semibold font-serif cursor-pointer hover:scale-105 transition-transform tracking-wide hover:text-gray-500"
        onClick={openBody}
      >
        ⚡ ProgressTrack
      </div>
      <span className="text-white text-2xl italic">
        {user ? `Welcome, ${user.email.split("@")[0]}` : "Guest"}
      </span>

      <div className="flex items-center space-x-4">
        <nav className="flex space-x-6 text-black text-lg font-medium">
          <Link to="taskDash" className="hover:text-gray-500 transition-colors">
            Tasks
          </Link>
          <Link
            to="movieDash"
            className="hover:text-gray-500 transition-colors"
          >
            Movies 🎬
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl text-black font-semibold shadow-md hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
