// header.jsx
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
  const openTasks = () => {
    navigate("/taskDash", { replace: true });
  };
  const openNotes = () => {
    navigate("/noteDash", { replace: true });
  };
  const openMovies = () => {
    navigate("/movieDash", { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 border-b bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between md:gap-0 md:py-4">
        <div
          className="cursor-pointer font-sans text-xl font-semibold tracking-tight text-emerald-700 transition-colors hover:text-emerald-800 md:text-2xl"
          onClick={openBody}
        >
          VisionaryVault
        </div>

        <span className="font-sans text-sm text-zinc-600 md:text-base">
          {user ? `Welcome, ${user.email.split("@")[0]}` : "Guest"}
        </span>

        <div className="flex items-center gap-4 md:gap-6">
          <nav
            aria-label="Primary"
            className="flex items-center gap-4 text-sm font-medium md:gap-6 md:text-base"
          >
            <h1
              onClick={openTasks}
              className="text-zinc-700 cursor-pointer transition-colors hover:text-emerald-700 underline-delay "
            >
              Tasks
            </h1>
            <h1
              onClick={openNotes}
              className="text-zinc-700 cursor-pointer transition-colors hover:text-emerald-700"
            >
              Notes
            </h1>
            <h1
              onClick={openMovies}
              className="text-zinc-700 cursor-pointer transition-colors hover:text-emerald-700"
            >
              Movies
            </h1>
          </nav>

          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="rounded-md bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
