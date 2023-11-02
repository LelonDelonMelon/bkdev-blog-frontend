import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Login from './components/Login.tsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Signup from './components/Signup.tsx';

const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
    },

    {
        path: "login",
        element: <Login></Login>,
    },
    {
        path: "signup",
        element: <Signup></Signup>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
