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
import { Link, Outlet } from "react-router";

const NotesDashboard = () => {
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
  return (
    <div>
      <div>
        <h1 className="text-center font-mono text-2xl mt-6">Note Dashboard</h1>
        <h1 className="text-center mt-5">
          <Link to="createNote">➕ Add new Note</Link>
        </h1>
      </div>
      <div className="flex flex-col ">
        <div className="flex-grow p-4 gap-12">
          {notesList.map((note) => (
            <div key={note.id}>
              <h1>Title:{note.title}</h1>
              <h1 className="w-72">Description:{note.description}</h1>
              <h1>Date:{note.date.toDate().toLocaleString()}</h1>
              <button
                onClick={() => deleteNote(note.id)}
                className="bg-red-600 px-2 py-1 text-sm text-white rounded-sm font-bold"
              >
                Delete Note
              </button>
            </div>
          ))}
        </div>
        <div className="">
          <Outlet context={{ setTrigger }} />
        </div>
      </div>
    </div>
  );
};

export default NotesDashboard;
