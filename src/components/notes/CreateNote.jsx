import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { auth } from "../../config/Firebase";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setTrigger } = useOutletContext();

  const NoteReference = collection(db, "notes");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const uploadNote = async () => {
    setError(null);
    setLoading(true);
    try {
      await addDoc(NoteReference, {
        description: description,
        date: Timestamp.now(),
        title: title,
        userId: auth.currentUser.uid,
      });
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add Note");
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setTitle("");
    setDescription("");
    setError(null);
  };
  return (
    <div className="flex items-center justify-center mb-14">
      <form
        onSubmit={handleSubmit}
        className="w-3/6 h-full p-6 rounded-2xl shadow bg-white space-y-1 border"
      >
        <h1 className="text-center text-xl font-semibold text-black">
          CreateNotes
        </h1>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/6 mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-3/4 mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
            rows={3}
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
            disabled={loading}
            onClick={() => {
              reset();
              uploadNote();
            }}
          >
            {loading ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
