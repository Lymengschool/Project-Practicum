import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/nav.jsx";

function Appp() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Nav/>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default Appp
