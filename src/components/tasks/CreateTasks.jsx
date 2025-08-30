import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/Firebase";
import { useOutletContext } from "react-router-dom";
import { auth } from "../../config/Firebase";

const CreateTasks = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueLocal, setDueLocal] = useState("");
  const [status, setStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setTrigger } = useOutletContext();

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
    }
  };

  return (
    <div className="flex items-center justify-center mt-7 mb-7">
      <form
        onSubmit={handleSubmit}
        className="w-[46vw] h-full relative p-6 rounded-2xl shadow bg-white space-y-4 border-l-4 border border-green-400"
      >
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Create Task
        </h1>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/6 mt-1 p-2 border border-green-400 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-4/6 mt-1 p-2 border border-green-400 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 outline-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Deadline
          </label>
          <input
            type="datetime-local"
            value={dueLocal}
            onChange={(e) => setDueLocal(e.target.value)}
            className="w-3/6 mt-1 p-2 border border-green-400 rounded-lg focus:border-green-500 focus:ring focus:ring-yellow-200 outline-none"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="status"
            type="checkbox"
            checked={status}
            onChange={(e) => setStatus(e.target.checked)}
            className="h-4 w-4 accent-yellow-500"
          />
          <label htmlFor="status" className="text-sm text-gray-700">
            Completed
          </label>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTasks;
