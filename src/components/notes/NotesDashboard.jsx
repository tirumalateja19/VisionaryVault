import {
  collection,
  doc,
  getDocs,
  where,
  deleteDoc,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../config/Firebase";
import { useAuth } from "../../context/AuthContext";
import { Outlet, useNavigate } from "react-router";
import Header from "../Header";

const NotesDashboard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const [notesList, setNoteList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const NoteReference = collection(db, "notes");
  const { user } = useAuth();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const q = query(NoteReference, where("userId", "==", user.uid));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNoteList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getNotes();
  }, [trigger]);

  const deleteNote = async (id) => {
    try {
      const NoteDoc = doc(db, "notes", id);
      await deleteDoc(NoteDoc);
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  const openForm = () => {
    setIsFormOpen(true);
    navigate("createNote");
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-center font-mono mt-6 text-3xl font-bold text-gray-800">
          📒 Note Dashboard
        </h1>
        <h1 className="text-center mt-4">
          <button
            onClick={openForm}
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
          >
            ➕ Add new Note
          </button>
        </h1>
      </div>

      <div className="flex flex-col items-center my-8 space-y-6">
        {notesList.map((note) => (
          <div
            key={note.id}
            className="w-[90vw] max-w-4xl bg-[#46c4a1] border border-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-serif capitalize text-white mb-2">
              {note.title}
            </h2>
            <p className="text-gray-100 text-sm mb-3 line-clamp-3">
              {note.description}
            </p>
            <p className="text-xs text-gray-50 mb-4">
              {note.date.toDate().toLocaleString()}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => deleteNote(note.id)}
                className="px-3 py-1 bg-red-600 text-white rounded-lg font-semibold shadow"
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
  );
};

export default NotesDashboard;
