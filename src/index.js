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
    children: [
      {
        path: "taskDash",
        element: <TaskDashboard />,
        children: [{ path: "createTask", element: <CreateTasks /> }],
      },
      {
        path: "movieDash",
        element: <MovieDashboard />,
        children: [{ path: "createMovie", element: <CreateMovie /> }],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <RouterProvider router={appRouter} />
  </AuthProvider>
);
