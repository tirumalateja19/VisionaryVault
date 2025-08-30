import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useOutletContext } from "react-router-dom";
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
  const { setTrigger } = useOutletContext();

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
    }
  };

  return (
    <div className="flex items-center justify-center mt-7 mb-7">
      <form
        onSubmit={handleSubmit}
        className="w-[56vw] h-full p-6 rounded-2xl shadow bg-white space-y-4 border border-black"
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
            className="w-full mt-1 p-2 border rounded focus:border-black"
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
            value={movieYear}
            className="w-full mt-1 p-2 border rounded focus:border-black"
            onChange={(e) => setMovieYear(e.target.value)}
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
            className="w-full mt-1 p-2 border rounded focus:border-black"
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
          <label htmlFor="check" className="ml-2 text-sm text-gray-700">
            Watched
          </label>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMovie;
