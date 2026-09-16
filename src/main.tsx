import { createBrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import Recipes from './pages/Recipes.tsx';
import RecipesNames from './pages/UserNames.tsx'
import UserNames from './pages/UserNames.tsx';
import Login from './pages/Login.tsx';

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
)
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

      {
        path: "/",
        element: <App />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
      },
      {
        path: "/user/:id",
        element: <UserNames />
      },
      {
        path: "/login",
        element: <Login />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)