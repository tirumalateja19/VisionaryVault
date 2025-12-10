import React, { useEffect, useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useNavigate, useOutletContext } from "react-router-dom";
import { auth } from "../../config/Firebase";

const CreateTasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueLocal, setDueLocal] = useState("");
  const [status, setStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setTrigger, isFormOpen, setIsFormOpen } = useOutletContext();

  const taskCollectionRef = collection(db, "tasks");

  const reset = () => {
    setTitle("");
    setDescription("");
    setDueLocal("");
    setStatus(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !dueLocal) {
      setError("All fields are required ❌");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await addDoc(taskCollectionRef, {
        description: description,
        due: Timestamp.fromDate(new Date(dueLocal)),
        status: status,
        title: title,
        userId: auth.currentUser.uid,
      });
      setTrigger((prev) => !prev);
      reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add task");
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
          className="w-[450px] bg-white p-6 rounded-xl shadow-2xl space-y-5"
        >
          <h1 className="text-xl font-semibold text-gray-800">Create Task</h1>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-600">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Deadline
            </label>
            <input
              type="datetime-local"
              value={dueLocal}
              onChange={(e) => setDueLocal(e.target.value)}
              className="w-full mt-1 p-2 border rounded-lg outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-gray-700">Completed</span>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Button section: layout (b) */}
          <div className="space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Saving..." : "Create Task"}
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

export default CreateTasks;
