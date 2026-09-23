import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import App from "../App";
import UserList from "../pages/UserList";
import User from "../pages/User";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Favorites from "../pages/favorites";
import Quote from "../pages/citation";
import Posts from "../pages/Posts";
import PostDetails from "../pages/PostDetails";

import GuestRoute from "../routes/GestRoutes";
import PrivateRoute from "../routes/PrivateRoute";
import RecipeNames from "../pages/RecipeNames";

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

const routes = [
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/userList",
                element: <UserList />,
            },
            {
                path: "/recipes/:id",
                element: <RecipeNames />,
            },
            {
                path: "/user/:userId",
                element: <User />,
            },
            {
                path: "/login",
                element: (
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                ),
            },
            {
                path: "/profile",
                element: (
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/favoris",
                element: (
                    <PrivateRoute>
                        <Favorites />
                    </PrivateRoute>
                ),
            },
            {
                path: "/citation",
                element: <Quote />,
            },
            {
                path: "/posts",
                element: <Posts />,
            },
            {
                path: "/posts/:id",
                element: <PostDetails />,
            },
        ],
    },
];

export default routes;