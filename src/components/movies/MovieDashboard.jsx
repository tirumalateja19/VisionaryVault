import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";
import { useAuth } from "../../context/AuthContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import Header from "../Header";

const MovieDashboard = () => {
  //movie data state
  const [movieList, setMovieList] = useState([]);
  //re-render helper state
  const [trigger, setTrigger] = useState(false);
  //collection reference
  const movieCollectionRef = collection(db, "movies");
  //custom auth access
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
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
        // console.log(filteredData);
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
  const changeStatus = async (id, state) => {
    try {
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, { watched: !state });
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  const openForm = () => {
    setIsFormOpen(true);
    navigate("createMovie");
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-center font-mono text-2xl mt-6">
          🎬 Movie Dashboard
        </h1>
        <h1 className="text-center mt-5">
          <button
            onClick={openForm}
            className="text-blue-600 hover:underline font-semibold"
          >
            ➕ Add new movie
          </button>
        </h1>

        <div className="flex flex-wrap justify-center gap-6 leading-7 my-10 px-6">
          {movieList.map((movie) => (
            <div
              key={movie.id}
              className="w-full sm:w-[45%] lg:w-[20vw] h-auto min-h-[22vh] p-4 rounded-xl shadow-md bg-white border border-gray-700 hover:shadow-lg transition-all"
            >
              <h1
                className="text-xl uppercase font-serif font-medium mb-2"
                style={{ color: movie.watched ? "green" : "red" }}
              >
                {movie.name}
              </h1>
              <p className="text-gray-600">📅 Year: {movie.year}</p>
              <p className="text-gray-600">🎭 Genre: {movie.genre}</p>

              <div className="flex justify-between">
                <button
                  onClick={() => changeStatus(movie.id, movie.watched)}
                  className="mt-3 px-3 py-1 bg-blue-500 text-white rounded-md font-semibold shadow"
                >
                  Change Status
                </button>
                <button
                  onClick={() => deleteMovie(movie.id)}
                  className="mt-3 bg-red-600  px-3 py-1 text-sm text-white rounded-md font-semibold shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Outlet context={{ setTrigger, isFormOpen, setIsFormOpen }} />
        </div>
      </div>
    </div>
  );
};

export default MovieDashboard;
