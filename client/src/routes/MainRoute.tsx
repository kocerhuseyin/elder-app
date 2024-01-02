import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Chats from "../pages/Chats";
import Friends from "../pages/Friends";
import Games from "../pages/Games";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Reminders from "../pages/Reminders";

const routes = [
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/friends",
    element: <Friends />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/games",
    element: <Games />,
  },
  {
    path: "/reminders",
    element: <Reminders />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const MainRoute = createBrowserRouter(routes, { basename: "/" });
