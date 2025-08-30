import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";
import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header";

const TaskDashboard = () => {
  const [taskList, setTaskList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { user } = useAuth();
  const taskCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const taskData = async () => {
      try {
        const q = query(taskCollectionRef, where("userId", "==", user.uid));
        const data = await getDocs(q);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTaskList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    taskData();
  }, [trigger]);

  const changeStatus = async (id, state) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { status: !state });
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteTask = async (id) => {
    try {
      const NoteDoc = doc(db, "tasks", id);
      await deleteDoc(NoteDoc);
      setTrigger((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h1 className="text-center font-mono mt-6 text-3xl font-bold text-gray-800">
          📝 Task Dashboard
        </h1>
        <h1 className="text-center mt-4">
          <Link
            to="createTask"
            className=" font-medium text-blue-600 hover:underline"
          >
            ➕ Create a new task
          </Link>
        </h1>
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-[90vw] max-w-4xl space-y-6">
          {taskList.map((task) => {
            return (
              <div
                key={task.id}
                className={`border-l-4 rounded-xl shadow-md p-5 border border-green-400 bg-white hover:shadow-lg transition 
            ${task.status === "Done" ? "border-green-500" : "border-red-500"}`}
              >
                <h2
                  className={`font-semibold text-lg mb-2 capitalize font-serif
                    ${
                      task.status
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                >
                  {task.title}
                </h2>
                <p className="text-gray-600 line-clamp-2">{task.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Due: {task.due.toDate().toLocaleString()}
                </p>
                <p className="mt-1">
                  <span className="font-medium text-gray-700">
                    Task Status:
                  </span>
                  {task.status ? "✅" : "❌"}
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => changeStatus(task.id, task.status)}
                    className="px-3 py-1 bg-blue-500 mt-2 text-white rounded-lg font-semibold shadow"
                  >
                    Change Status
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg font-semibold shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <Outlet context={{ setTrigger }} />
      </div>
    </div>
  );
};

export default TaskDashboard;
