import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateMovie = () => {
  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [watchedMovie, setMovieWatched] = useState(false);

  const movieCollectionRef = collection(db, "movies");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { setTrigger, isFormOpen, setIsFormOpen } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const closeModal = () => {
    setIsFormOpen(false);
    navigate("..");
  };

  const reset = () => {
    setMovieName("");
    setMovieGenre("");
    setMovieWatched(false);
    setMovieYear("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!movieName || !movieYear || !movieGenre) {
      setError("All fields are required ❌");
      return;
    }

    setLoading(true);
    try {
      await addDoc(movieCollectionRef, {
        genre: movieGenre,
        name: movieName,
        watched: watchedMovie,
        year: Number(movieYear),
        userId: user.uid,
      });

      setTrigger((prev) => !prev);
      reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add movie");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    isFormOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
        <form
          onSubmit={handleSubmit}
          className="w-[450px] bg-white p-6 rounded-xl shadow-2xl space-y-5 border border-black"
        >
          <h2 className="text-center text-2xl font-semibold text-black">
            Add New Movie
          </h2>

          {/* Movie Name */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-700">
              Movie Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Release Year */}
          <div>
            <label htmlFor="year" className="block text-sm text-gray-700">
              Release Year
            </label>
            <input
              id="year"
              type="number"
              required
              value={movieYear}
              onChange={(e) => setMovieYear(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Genre */}
          <div>
            <label htmlFor="genre" className="block text-sm text-gray-700">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              required
              value={movieGenre}
              onChange={(e) => setMovieGenre(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-200 outline-none"
            />
          </div>

          {/* Watched Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="check"
              checked={watchedMovie}
              onChange={(e) => setMovieWatched(e.target.checked)}
              className="h-4 w-4 accent-yellow-500"
            />
            <label htmlFor="check" className="ml-2 text-sm text-gray-700">
              Watched
            </label>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Movie"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="text-sm text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default CreateMovie;
