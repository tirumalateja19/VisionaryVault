import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateMovie = () => {
  const [movieName, setMovieName] = useState("");
  const [movieYear, setMovieYear] = useState(0);
  const [movieGenre, setMovieGenre] = useState("");
  const [watchedMovie, setMovieWatched] = useState(false);

  const movieCollectionRef = collection(db, "movies");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { setTrigger } = useOutletContext();

  const uploadMovie = async () => {
    setError(null);
    setLoading(true);
    try {
      await addDoc(movieCollectionRef, {
        genre: movieGenre,
        name: movieName,
        watched: watchedMovie,
        year: movieYear,
        userId: user.uid,
      });
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const reset = () => {
    setMovieName("");
    setMovieGenre("");
    setMovieWatched(false);
    setMovieYear(0);
    setError(null);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-[90%] sm:w-[400px] p-6 rounded-2xl shadow bg-white space-y-4 border"
      >
        <h2 className="text-center text-2xl font-semibold text-black">
          Add New Movie
        </h2>

        <div>
          <label htmlFor="name" className="block text-sm text-gray-700">
            Movie Name
          </label>
          <input
            id="name"
            type="text"
            value={movieName}
            required
            className="w-full mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
            onChange={(e) => setMovieName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="year" className="block text-sm text-gray-700">
            Release Year
          </label>
          <input
            type="number"
            id="year"
            required
            className="w-full mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
            onChange={(e) => setMovieYear(Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm text-gray-700">
            Genre
          </label>
          <input
            type="text"
            value={movieGenre}
            required
            className="w-full mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
            onChange={(e) => setMovieGenre(e.target.value)}
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="check"
            checked={watchedMovie}
            className="h-4 w-4 accent-yellow-500"
            onChange={(e) => setMovieWatched(e.target.checked)}
          />
          <label htmlFor="check" className="ml-2 text-sm text-gray-300">
            Watched
          </label>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={loading}
            onClick={uploadMovie}
            className="px-4 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={reset}
            disabled={loading}
            className="px-4 py-2 rounded-lg border"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
