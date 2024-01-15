import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
<<<<<<< HEAD
    {
<<<<<<< HEAD
      path: "/f",
=======
      path: "/footer",
>>>>>>> d425ef01d540f848b767bb80ea0a77abf4759089
      element: <Footer/>
    }
=======
>>>>>>> 51feb6f40e9635974ae03e44365f86d3896a2b3c
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App
