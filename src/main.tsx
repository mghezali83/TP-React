import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store/store";

import routes from "./routes/route";

import type { User as UserType } from "./types/user";
import { setUsers } from "./store/reducers/user";
import { setLoggedUser } from "./store/reducers/auth";
import { setLoading } from "./store/reducers/loading";

import "./index.css";

interface UsersResponse {
  users: UserType[];
}

const getUsers = async () => {
  const url = "https://dummyjson.com/users";

  const response = await axios.get<UsersResponse>(url);

  store.dispatch(setUsers(response.data.users));
};

const getLoggedUser = async () => {
  try {
    const url = "https://dummyjson.com/auth/me";

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    store.dispatch(setLoggedUser(response.data));
  } catch {
    localStorage.removeItem("token");
    store.dispatch(setLoggedUser(null));
  }
};

Promise.all([getUsers(), getLoggedUser()])
  .finally(() => {
    store.dispatch(setLoading(false));
  });

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);