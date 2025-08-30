import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./components/Body";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import TaskDashboard from "./components/tasks/TaskDashboard";
import MovieDashboard from "./components/movies/MovieDashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import CreateMovie from "./components/movies/CreateMovie";
import CreateTasks from "./components/tasks/CreateTasks";
import NotesDashboard from "./components/notes/NotesDashboard";
import CreateNote from "./components/notes/CreateNote";

const appRouter = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/body",
    element: (
      <ProtectedRoute>
        <Body />
      </ProtectedRoute>
    ),
  },
  {
    path: "/taskDash",
    element: (
      <ProtectedRoute>
        <TaskDashboard />
      </ProtectedRoute>
    ),
    children: [{ path: "createTask", element: <CreateTasks /> }],
  },

  {
    path: "movieDash",
    element: (
      <ProtectedRoute>
        <MovieDashboard />
      </ProtectedRoute>
    ),
    children: [{ path: "createMovie", element: <CreateMovie /> }],
  },
  {
    path: "noteDash",
    element: (
      <ProtectedRoute>
        <NotesDashboard />
      </ProtectedRoute>
    ),
    children: [{ path: "createNote", element: <CreateNote /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
);
