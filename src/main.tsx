import { createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import Recipes from './pages/Recipes.tsx';
import UserNames from './pages/UserNames.tsx';
import Login from './pages/Login.tsx';
import Profile from './pages/Profile.tsx';
import RecipeNames from './pages/RecipeNames.tsx';
import NotFound from './pages/NotFound.tsx';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
)
const router = createBrowserRouter([{
  element: <Layout />,
  children: [

    {
      path: "/",
      element: <App />,
    },
    {
      path: "/userList",
      element: <Recipes />,
    },
    {
      path: "/recipes/:id",
      element: <RecipeNames />
    },
    {
      path: "/user/:id",
      element: <UserNames />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/profile/:id",
      element: <Profile />
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]
}]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)