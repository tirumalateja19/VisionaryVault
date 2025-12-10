import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { auth } from "../../config/Firebase";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setTrigger, isFormOpen, setIsFormOpen } = useOutletContext();
  const navigate = useNavigate();

  const NoteReference = collection(db, "notes");

  const reset = () => {
    setTitle("");
    setDescription("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      setError("All fields are required ❌");
      return;
    }
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
      reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add Note");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const closeModal = () => {
    setIsFormOpen(false);
    navigate("..");
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    isFormOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
        <form
          onSubmit={handleSubmit}
          className="w-[450px] bg-white p-6 rounded-xl shadow-2xl space-y-5 border border-[#46c4a1]"
        >
          <h1 className="text-center text-xl font-semibold text-black">
            Create Note
          </h1>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-[#46c4a1] rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-[#46c4a1] rounded"
              rows={3}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Full-width button + cancel link */}
          <div className="space-y-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Note"}
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

export default CreateNote;
