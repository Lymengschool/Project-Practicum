import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/nav.jsx";
import Footer from "./components/footer.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav/>
    },
    {
<<<<<<< HEAD
      path: "/f",
=======
      path: "/footer",
>>>>>>> d425ef01d540f848b767bb80ea0a77abf4759089
      element: <Footer/>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App
