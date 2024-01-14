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
      path: "/footer",
      element: <Footer/>
    }
  ])

  return (
    <RouterProvider router={router} />
  );
}

export default App
