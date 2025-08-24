import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../../config/Firebase";
import { useAuth } from "../../context/AuthContext";
import { Link, Outlet } from "react-router-dom";

const TaskDashboard = () => {
  const [taskList, setTaskList] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const { user } = useAuth();
  const taskCollectionRef = collection(db, "tasks");
  const now = new Date();

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

  return (
    <div>
      <h1 className="text-center font-mono text-2xl mt-6">Task Dashboard</h1>
      <h1 className="text-center mt-5">
        <Link to="createTask">➕Create a new task!!</Link>
      </h1>
      <div className="flex justify-around items-center">
        <div>
          {taskList.map((task) => (
            <div key={task.id} className="mt-10 ml-28">
              <h1>Task: {task.title}</h1>
              <h1>Description: {task.description}</h1>
              <h1>Due : {task.due.toDate().toLocaleString()}</h1>
              <h1>
                Task Status:{" "}
                {task.due.toDate() > now
                  ? "⏳ Pending"
                  : task.status === true
                  ? "✅ Done"
                  : "❌ Not Done"}
              </h1>

              <button
                onClick={() => {
                  changeStatus(task.id, task.status);
                }}
                className="bg-green-300 px-2 py-1 rounded-sm"
              >
                change status
              </button>
            </div>
          ))}
          <br />
          <br />
        </div>

        <div className="mt-5">
          <Outlet context={{ setTrigger }} />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
