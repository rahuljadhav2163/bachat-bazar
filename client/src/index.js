import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home';
import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Orders from './views/Orders/Orders';
import Buynow from './views/Buynow/Buynow';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/order",
    element: <Orders />,
  },
  {
    path: "/buynow/:id",
    element: <Buynow />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);


