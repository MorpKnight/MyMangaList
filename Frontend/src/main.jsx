
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import "./index.css"
import AddMediaPage from "./pages/AddMediaPage"
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import RanksPage from "./pages/RanksPage";
import DetailsPage from "./pages/DetailsPage";


const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/home/add",
        element: <AddMediaPage />,
      },
      {
        path: "/ranks",
        element: <RanksPage />,
      },
      {
        path: "/details/:id",
        element: <DetailsPage />,
      }
    ],
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  );
}
