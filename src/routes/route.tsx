import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import App from "../App";
import UserList from "../pages/UserList";
import User from "../pages/User";
import Login from "../pages/Login";
import GuestRoute from "../routes/GestRoutes";
import RecipeDetail from "../pages/RecipeDetail";
import Blog from "../pages/Blog";
import PostDetail from "../pages/PostDetail";
import NotFound from "../pages/NotFound";

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
                path: "/recipes/:id",
                element: <RecipeDetail />,
            },
            {
                path: "/posts",
                element: <Blog />,
            },
            {
                path: "/posts/:id",
                element: <PostDetail />,
            },
            {
                path: "/userList",
                element: <UserList />,
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
                path: "*",
                element: <NotFound />,
            },
        ],
    },
];

export default routes;