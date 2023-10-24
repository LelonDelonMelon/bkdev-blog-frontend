import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import AdminPanel from './admin/index.tsx';
import Login from './components/Login.tsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <AdminPanel></AdminPanel>,
    },
    {
        path: "login",
        element: <Login></Login>,
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
