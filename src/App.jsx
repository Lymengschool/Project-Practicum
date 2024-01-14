import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/nav.jsx";
import Footer from "./components/footer.jsx";

function Appp() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav/>
    },
    {
      path: "/f",
      element: <Footer/>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default Appp
