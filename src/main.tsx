import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./components/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPanel from "./admin/index.tsx";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound.tsx";
import Profile from "./components/Profile.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminPanel />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
