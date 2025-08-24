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

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const uploadTask = async () => {
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
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setTitle("");
    setDescription("");
    setDueLocal("");
    setStatus(false);
    setError(null);
  };

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
          className="w-[90%] sm:w-[400px] p-6 rounded-2xl shadow bg-white space-y-4 border"
        >
          <h1 className="text-center text-2xl font-semibold text-black">
            CreateTasks
          </h1>
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // placeholder="Das problem"
              className="w-full mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              // placeholder="solve a leet code problem"
              className="w-full mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Due (local)</label>
            <input
              type="datetime-local"
              value={dueLocal}
              onChange={(e) => setDueLocal(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:border-blue-400 focus:ring focus:ring-blue-500"
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
            <label htmlFor="status" className="text-sm ml-2">
              Completed
            </label>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition"
              disabled={loading}
              onClick={uploadTask}
            >
              {loading ? "Saving..." : "Save Task"}
            </button>

            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 border rounded"
              disabled={loading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTasks;
