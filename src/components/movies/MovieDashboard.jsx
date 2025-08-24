import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";
import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const MovieDashboard = () => {
  //movie data state
  const [movieList, setMovieList] = useState([]);
  //re-render helper state
  const [trigger, setTrigger] = useState(false);
  //collection reference
  const movieCollectionRef = collection(db, "movies");
  //custom auth access
  const { user } = useAuth();

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const q = query(movieCollectionRef, where("userId", "==", user.uid));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [trigger]);

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-center font-mono text-2xl mt-6">Movie Dashboard</h1>
      <h1 className="text-center mt-5">
        <Link to="createMovie">➕ Add new movie</Link>
      </h1>
      <div className="flex justify-around items-center mt-10">
        <div className="w-[10vw] font-serif text-lg">
          {movieList.map((movie) => (
            <div key={movie.id}>
              <h1
                className="text-xl font-bold"
                style={{ color: movie.watched ? "green" : "red" }}
              >
                Title: {movie.name}
              </h1>
              <h1>Year: {movie.year}</h1>
              <h2>Genre: {movie.genre}</h2>
              <button
                onClick={() => deleteMovie(movie.id)}
                className="bg-red-600 px-2 py-1 text-sm text-white rounded-sm font-bold"
              >
                Delete movie
              </button>
            </div>
          ))}
        </div>
        <div>
          <Outlet context={{ setTrigger }} />
        </div>
      </div>
    </div>
  );
};

export default MovieDashboard;
