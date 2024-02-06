import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/LoginPage.jsx";
import Register from "./pages/RegisterPage.jsx";
import Setting from "./pages/SettingPage.jsx";
import Result from "./pages/resultPage.jsx";
import Profile from "./pages/ProfilePage.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/setting",
      element: <Setting/>
    },
    {
      path: "/result",
      element: <Result/>
    },
    {
      path: "/profile",
      element: <Profile/>
    }

  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App
