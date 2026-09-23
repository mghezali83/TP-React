import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import App from "../App";
import UserList from "../pages/UserList";
import User from "../pages/User";
import Login from "../pages/Login";
import GuestRoute from "../routes/GestRoutes";

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
        ],
    },
];

export default routes;